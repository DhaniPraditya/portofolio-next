"use client";

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-auto my-6 sm:my-8 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] shadow-lg md:shadow-xl box-border origin-top ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '15%',
  scaleEndPosition = '8%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  const endElementTopRef = useRef<number>(0);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isIntersectingRef = useRef(true);
  const rafPendingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  // Computes static document layout position (unaffected by card transform matrix)
  const getStaticElementOffset = useCallback((element: HTMLElement) => {
    let top = 0;
    let current: HTMLElement | null = element;
    while (current) {
      top += current.offsetTop;
      current = current.offsetParent as HTMLElement | null;
    }
    return top;
  }, []);

  const measureLayout = useCallback(() => {
    if (!cardsRef.current.length) return;
    cardTopsRef.current = cardsRef.current.map(card => getStaticElementOffset(card));

    const endElement = useWindowScroll
      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

    endElementTopRef.current = endElement ? getStaticElementOffset(endElement) : 0;
  }, [useWindowScroll, getStaticElementOffset]);

  const updateCardTransforms = useCallback(() => {
    rafPendingRef.current = false;
    // Skip calculations completely if the section is not in the viewport or if reduced motion is preferred!
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!cardsRef.current.length || !isIntersectingRef.current || prefersReducedMotion) return;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElementTop = endElementTopRef.current;
    const hasBlur = blurAmount > 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTopsRef.current[i] ?? getStaticElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (hasBlur) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardTopsRef.current[j] ?? getStaticElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 10) / 10,
        blur: Math.round(blur * 10) / 10
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) >= 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) >= 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) >= 0.5 ||
        Math.abs(lastTransform.blur - newTransform.blur) >= 0.5;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})${newTransform.rotation ? ` rotate(${newTransform.rotation}deg)` : ''}`;
        
        card.style.transform = transform;
        if (hasBlur) {
          card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        }

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getStaticElementOffset
  ]);

  const scheduleUpdate = useCallback(() => {
    if (!rafPendingRef.current) {
      rafPendingRef.current = true;
      requestAnimationFrame(updateCardTransforms);
    }
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const isTouchMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: isTouchMobile ? 0.8 : 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: !isTouchMobile,
        touchMultiplier: 1.5,
        infinite: false,
        wheelMultiplier: 1,
        lerp: isTouchMobile ? 0.2 : 0.1,
        syncTouch: false
      });

      lenis.on('scroll', scheduleUpdate);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: false
      });

      lenis.on('scroll', scheduleUpdate);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [scheduleUpdate, useWindowScroll]);

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])
    ) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    measureLayout();
    setupLenis();
    updateCardTransforms();

    const observerTarget = scrollerRef.current || document.querySelector('.scroll-stack-inner');
    let observer: IntersectionObserver | null = null;
    if (observerTarget && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isIntersectingRef.current = entry.isIntersecting;
            if (entry.isIntersecting) {
              measureLayout();
              scheduleUpdate();
            }
          });
        },
        { rootMargin: '300px 0px 300px 0px' }
      );
      observer.observe(observerTarget);
    }

    const onResize = () => {
      measureLayout();
      scheduleUpdate();
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('load', onResize, { passive: true });
    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    const timer = setTimeout(() => {
      measureLayout();
      scheduleUpdate();
    }, 400);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      window.removeEventListener('scroll', scheduleUpdate);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardTopsRef.current = [];
      transformsCache.clear();
      isIntersectingRef.current = true;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    scheduleUpdate,
    measureLayout
  ]);

  return (
    <div
      className={`relative w-full ${useWindowScroll ? 'h-auto overflow-visible' : 'h-full overflow-y-auto overflow-x-visible'} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className={`scroll-stack-inner ${useWindowScroll ? 'pt-4 px-0 pb-[40vh] md:pb-[60vh]' : 'pt-[20vh] px-0 md:px-12 pb-[50rem] min-h-screen'}`}>
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
