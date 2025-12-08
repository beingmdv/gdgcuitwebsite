"use client";
import React, { useState } from "react";

export default function ImageWithFallback({ src, fallback = "https://via.placeholder.com/800x600?text=Image", alt = "", className = "", ...props }) {
  const [current, setCurrent] = useState(src || fallback);

  return (
    // keep layout stable by passing className through; fallback will show if original fails
    <img
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      className={className}
      {...props}
    />
  );
}
