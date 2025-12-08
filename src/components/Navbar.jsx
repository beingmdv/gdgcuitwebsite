"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pages = [
    "home",
    "team",
    "events",
    "resources",
    "join",
    "contact",
  ];

  const handleNav = (page) => {
    window.location.href = `/${page === "home" ? "" : page}`;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all ${isScrolled
          ? "bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-white/95 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 group"
        >
          <img
            src="data:image/png;base64,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"
            alt="logo"
            className="w-12 h-12 rounded-md object-fit"
          />
          <div className="hidden sm:block">
            <div className="font-semibold text-gray-900">
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#EA4335" }}>D</span>
              <span style={{ color: "#FBBC05" }}>G</span>
              <span style={{ color: "#34A853" }}>C</span>
              {" "}
              <span className="text-gray-700">UIT-RGPV</span>
            </div>
            <div className="text-xs text-gray-500">Bhopal</div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => handleNav(p)}
              className="relative px-4 py-2 text-sm text-gray-700 hover:text-[#4285F4] transition"
            >
              {p[0].toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <Button onClick={() => handleNav("join")}>Join Us</Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="p-2">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4 shadow-lg">
          <div className="flex flex-col gap-2">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => handleNav(p)}
                className="py-3 text-left text-gray-700 hover:text-[#4285F4]"
              >
                {p[0].toUpperCase() + p.slice(1)}
              </button>
            ))}
            <Button className="mt-2 w-full" onClick={() => handleNav("join")}>
              Join Us
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
