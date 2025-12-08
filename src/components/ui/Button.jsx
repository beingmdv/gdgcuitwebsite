"use client";
import React from "react";

export default function Button({ children, className = "", asChild = false, ...props }) {
  // asChild support: if asChild is true and children is an anchor, we just pass props to it.
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-transform duration-150";
  const defaultStyle = "bg-[#4285F4] hover:bg-[#3367D6] text-white";

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${base} ${defaultStyle} ${className} ${children.props.className ?? ""}`.trim(),
      ...props,
    });
  }

  return (
    <button {...props} className={`${base} ${defaultStyle} ${className}`}>
      {children}
    </button>
  );
}
