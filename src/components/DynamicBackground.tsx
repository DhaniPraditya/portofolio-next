"use client";

import dynamic from "next/dynamic";

const BackgroundMesh = dynamic(() => import("./BackgroundMesh"), { ssr: false });

export default function DynamicBackground() {
  return <BackgroundMesh />;
}
