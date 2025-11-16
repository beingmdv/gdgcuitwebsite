"use client";
// src/components/Navbar.jsx
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

  const pages = ["home", "events", "projects", "join", "contact"];

  return (
    <nav className={`fixed w-full z-50 transition-all ${isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=60" alt="logo" className="w-10 h-10 rounded-md object-cover" />
          <span className="font-semibold">GDGC UIT</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {pages.map((p) => (
            <button key={p} className="text-sm text-gray-700">{p[0].toUpperCase() + p.slice(1)}</button>
          ))}
          <Button onClick={() => window.location.href = "/join"}>Join</Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(v => !v)} className="p-2 rounded-md">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 px-4 pb-4 border-t">
          <div className="flex flex-col gap-2">
            {pages.map((p) => <button key={p} className="py-2 text-left">{p[0].toUpperCase() + p.slice(1)}</button>)}
            <div className="mt-3"><Button className="w-full" onClick={() => window.location.href = "/join"}>Join</Button></div>
          </div>
        </div>
      )}
    </nav>
  );
}
