"use client";

import React from "react";
import Link from "next/link";
import { BRANDS } from "@/data/mockData";

export function FeaturedBrands() {
  return (
    <section className="mt-8">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-xl sm:text-[22px] font-bold text-[#212b36] mb-4 sm:mb-5">
          Thương hiệu nổi bật
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Large Banner */}
          <div className="hidden sm:block md:col-span-4 rounded-[15px] overflow-hidden shadow-xs">
            <Link
              href="/collections/all"
              className="block h-full group relative overflow-hidden"
            >
              <img
                src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/wolf_brand_image.jpg?1724383668661"
                alt="Thương hiệu nổi bật banner"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Right Brand Grid */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {BRANDS.map((brand) => (
                <Link
                  key={brand.id}
                  href={brand.href}
                  title={brand.name}
                  className="bg-white border border-gray-200 hover:border-[#1b7dae] rounded-xl p-2.5 flex items-center justify-center h-16 sm:h-20 transition-all hover:shadow-xs group"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain filter grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-200"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
