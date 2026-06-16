"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type SkeletonAnimation = "shimmer" | "pulse" | "breathe" | "solid";

interface SkeletonContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  animation: SkeletonAnimation;
  setAnimation: (animation: SkeletonAnimation) => void;
}

const SkeletonContext = createContext<SkeletonContextType | undefined>(undefined);

export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState<SkeletonAnimation>("shimmer");

  useEffect(() => {
    // Automatically turn off initial loading after 1.5s to reveal content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Dynamic import to register the <phantom-ui> Web Component client-side only
    import("@aejkatappaja/phantom-ui")
      .then(() => {
        console.log("phantom-ui custom element successfully registered.");
      })
      .catch((err) => {
        console.error("Failed to load @aejkatappaja/phantom-ui:", err);
      });

    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonContext.Provider value={{ loading, setLoading, animation, setAnimation }}>
      {children}
    </SkeletonContext.Provider>
  );
}

export function useSkeleton() {
  const context = useContext(SkeletonContext);
  if (context === undefined) {
    throw new Error("useSkeleton must be used within a SkeletonProvider");
  }
  return context;
}
