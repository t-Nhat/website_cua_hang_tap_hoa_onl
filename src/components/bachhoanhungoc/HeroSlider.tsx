"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDER_IMAGES } from "@/data/mockData";

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDER_IMAGES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDER_IMAGES.length);
  };

  return (
    <section className="mt-3 sm:mt-4">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="relative rounded-[15px] overflow-hidden group shadow-xs">
          {/* Slides */}
          <div className="relative aspect-[1920/651] w-full bg-gray-100">
            {SLIDER_IMAGES.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Link href={slide.href} className="block w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-[15px]"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Slide trước"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Slide tiếp theo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
            {SLIDER_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Đi tới slide ${index + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  index === current
                    ? "w-7 bg-[#1b7dae]"
                    : "w-2 bg-gray-400/80 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
