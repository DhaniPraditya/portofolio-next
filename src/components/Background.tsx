"use client";

import { useTheme } from "@/components/ThemeProvider";
import Grainient from "./ui/Grainient";

export default function BackgroundMesh() {
  const { theme } = useTheme();

  // Dynamic colors for WebGL canvas background
  const colors = theme === "dark" 
    ? { color1: "#030712", color2: "#1e1b4b", color3: "#030712" }
    : { color1: "#e0f2fe", color2: "#e0e7ff", color3: "#faf5ff" };

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Grainient
        color1={colors.color1}
        color2={colors.color2}
        color3={colors.color3}
        timeSpeed={0.25}
        colorBalance={0.25}
        warpStrength={4}
        warpFrequency={6.6}
        warpSpeed={3.5}
        warpAmplitude={50.0}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500.0}
        noiseScale={2.0}
        grainAmount={0.1}
        grainScale={3.3}
        grainAnimated={false}
        contrast={0.9}
        gamma={1}
        saturation={1}
        centerX={0.0}
        centerY={0.0}
        zoom={0.9}
      />
    </div>
  );
}
