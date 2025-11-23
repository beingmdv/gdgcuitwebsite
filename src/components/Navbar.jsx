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
      className={`fixed w-full z-50 transition-all ${
        isScrolled
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
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=60"
            alt="logo"
            className="w-12 h-12 rounded-md object-cover"
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
