"use client";

import Grainient from "./ui/Grainient";

export default function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Grainient
        color1="#1e1040"
        color2="#3a186a"
        color3="#02182b"
        timeSpeed={0.25}
        colorBalance={0.25}
        warpStrength={3.1}
        warpFrequency={6.6}
        warpSpeed={3.0}
        warpAmplitude={50.0}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500.0}
        noiseScale={2.0}
        grainAmount={0.1}
        grainScale={3.3}
        grainAnimated={true}
        contrast={1.0}
        gamma={0.5}
        saturation={1}
        centerX={0.0}
        centerY={0.0}
        zoom={0.9}
      />
    </div>
  );
}
