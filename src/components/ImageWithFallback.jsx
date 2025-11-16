"use client";
// src/components/ImageWithFallback.jsx
import React, { useState } from "react";

export function ImageWithFallback({ src, alt = "", className = "", fallback = "https://via.placeholder.com/800x600?text=Image", ...props }) {
  const [ok, setOk] = useState(true);
  return (
    // using regular img keeps it simple — swap to next/image later if you add remote domains
    <img
      src={ok ? src : fallback}
      alt={alt}
      className={className}
      onError={() => setOk(false)}
      {...props}
    />
  );
}
