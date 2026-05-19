"use client";

import DotField from "./ui/DotField";

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#030712]" /> {/* Base background color */}
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={true}
        waveAmplitude={0}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom="#5D9BFF"
        gradientTo="#0f2a4a"
        glowColor="#120F17"
      />
    </div>
  );
}
