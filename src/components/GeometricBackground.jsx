"use client";
import React from "react";

/**
 * Minimal decorative background component.
 * Adjust gradients/shapes to match your Figma later.
 */
export default function GeometricBackground({ variant = "white" }) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#4285F4]/10 to-transparent blur-3xl" />
      <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-lg bg-gradient-to-tr from-[#34A853]/10 to-transparent blur-2xl" />
    </div>
  );
}
