"use client";

import React from "react";
import Link from "next/link";

export function FeaturePromoBanners() {
  return (
    <section className="mt-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/collections/all"
            className="block rounded-[15px] overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
          >
            <img
              src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/feature_banner_1.jpg?1724383668661"
              alt="Wolf Food Khuyến Mãi 1"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </Link>
          <Link
            href="/collections/all"
            className="block rounded-[15px] overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
          >
            <img
              src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/feature_banner_2.jpg?1724383668661"
              alt="Wolf Food Khuyến Mãi 2"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
