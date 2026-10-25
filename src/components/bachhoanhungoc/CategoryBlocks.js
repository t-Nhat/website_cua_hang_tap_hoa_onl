"use client";
import React from "react";
import Link from "next/link";
import { CATEGORY_CARDS } from "@/data/mockData";
export function CategoryBlocks() {
    return (<section className="mt-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORY_CARDS.map((card, idx) => (<div key={idx} className="rounded-[15px] p-6 bg-cover bg-center shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between min-h-[290px]" style={{ backgroundImage: `url(${card.bgImage})` }}>
              <div>
                <h3 className="text-lg font-bold text-[#3e4a5e] mb-4">
                  {card.title}
                </h3>

                <ul className="space-y-2 mb-6">
                  {card.subcategories.map((sub, sIdx) => (<li key={sIdx} className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3e4a5e] mr-2 shrink-0 group-hover:bg-[#1b7dae]"></span>
                      <Link href={sub.href} className="text-[#3e4a5e] hover:text-[#1b7dae] transition-colors">
                        {sub.name}
                      </Link>
                    </li>))}
                </ul>
              </div>

              <div>
                <Link href={card.href} className="inline-block text-xs font-semibold bg-[#1b7dae] hover:bg-[#145d82] text-white px-4 py-1.5 rounded-full shadow-xs transition-colors">
                  Mua sắm ngay
                </Link>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
