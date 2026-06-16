"use client";

import React from "react";
import { useSkeleton } from "@/components/SkeletonProvider";

interface SkeletonContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function SkeletonContainer({ children, className = "block" }: SkeletonContainerProps) {
  const { loading, animation } = useSkeleton();

  return (
    <phantom-ui loading={loading || undefined} animation={animation} className={className}>
      {children}
    </phantom-ui>
  );
}
