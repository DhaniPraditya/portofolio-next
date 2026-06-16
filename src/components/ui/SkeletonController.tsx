"use client";

import { useState } from "react";
import { useSkeleton } from "../SkeletonProvider";

export default function SkeletonController() {
  const { loading, setLoading, animation, setAnimation } = useSkeleton();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[45] flex flex-col items-end">
      {/* Expanded Control Panel */}
      <div
        className={`w-72 bg-card/85 backdrop-blur-md border border-card-border rounded-2xl shadow-2xl p-5 mb-4 flex flex-col gap-4 transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-card-border pb-3">
          <div className="flex items-center gap-2">
            {/* Sparkles Icon */}
            <svg
              className="text-primary w-5 h-5 animate-pulse"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.187L15 15l-5.187.813zM18 10.5l-.5 3-.5-3-3-.5 3-.5.5-3 .5 3 3 .5-3 .5zM19.083 4.25l-.25 1.5-.25-1.5-1.5-.25 1.5-.25.25-1.5.25 1.5 1.5.25-1.5.25z"
              />
            </svg>
            <span className="font-bold text-sm text-foreground">Skeleton Control</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-bold uppercase tracking-wider">
            Phantom UI
          </span>
        </div>

        {/* Toggle Loading */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground/80">Simulate Loading</span>
          <button
            onClick={() => setLoading(!loading)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              loading ? "bg-primary" : "bg-foreground/20"
            }`}
            type="button"
            role="switch"
            aria-checked={loading}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                loading ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Animation Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-foreground/70">Animation Style</span>
          <div className="grid grid-cols-2 gap-1.5">
            {(["shimmer", "pulse", "breathe", "solid"] as const).map((style) => (
              <button
                key={style}
                onClick={() => setAnimation(style)}
                className={`py-1.5 px-2.5 text-xs font-bold rounded-lg border uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  animation === style
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-secondary/40 border-card-border text-foreground/60 hover:text-foreground/85"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Explainer / Description */}
        <div className="text-[11px] text-foreground/60 border-t border-card-border pt-3 leading-relaxed">
          <p>
            Uses <code>&lt;phantom-ui&gt;</code> to measure DOM elements at runtime and overlay matching, animated placeholder skeletons automatically.
          </p>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3.5 rounded-full text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center relative group ${
          isOpen ? "bg-red-500 hover:bg-red-600 shadow-red-500/20" : "bg-primary hover:bg-primary/95 shadow-primary/30"
        }`}
        aria-label="Toggle skeleton configuration panel"
      >
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}>
          {isOpen ? (
            // Close Icon
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Skeleton Layout / Dashboard Icon
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M9 4v16" />
            </svg>
          )}
        </span>

        {/* Pulsing state indicator when loader is running */}
        {loading && !isOpen && (
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-0.5 -mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </span>
        )}

        {/* Glow effect on hover */}
        <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
      </button>
    </div>
  );
}
