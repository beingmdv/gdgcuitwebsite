// components/Hero.jsx
"use client";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Convert your Figma designs<br className="hidden sm:block"/> into a fast Next.js site
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            We'll build components from your provided Figma file, one screen at a time — responsive, accessible, and styled with Tailwind.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>See features</Button>
            <a href="#gallery" className="text-sm underline text-gray-600">View gallery</a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 max-w-xs">
            <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60" alt="thumb1" className="rounded-lg shadow-sm" />
            <img src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&q=60" alt="thumb2" className="rounded-lg shadow-sm" />
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=60" alt="thumb3" className="rounded-lg shadow-sm" />
          </div>
        </div>

        <div className="order-first lg:order-last">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
              alt="hero"
              className="w-full object-cover h-64 sm:h-80 lg:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
