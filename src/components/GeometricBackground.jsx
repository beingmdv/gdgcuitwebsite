"use client";
// src/components/GeometricBackground.jsx
import React from "react";

export function GeometricBackground({ variant = "white" }) {
  // simple decorative SVG background that matches the style
  return (
    <div aria-hidden className="absolute inset-0 -z-0 pointer-events-none">
      <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>
    </div>
  );
}
