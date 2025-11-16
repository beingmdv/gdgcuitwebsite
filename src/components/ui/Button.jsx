"use client";
// src/components/ui/Button.jsx
import React from "react";

export default function Button({ children, className = "", variant, ...props }) {
  const base = "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-transform";
  if (variant === "outline") {
    return (
      <button
        {...props}
        className={`${base} border bg-transparent ${className}`}
      >
        {children}
      </button>
    );
  }
  // default solid
  return (
    <button
      {...props}
      className={`${base} bg-[#4285F4] text-white ${className}`}
    >
      {children}
    </button>
  );
}
