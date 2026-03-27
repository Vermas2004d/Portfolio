"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string; // path to certificate image
};

export const CertificateCarousel = ({
  items,
  className,
}: {
  items: Certificate[];
  className?: string;
}) => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  const item = items[current];

  return (
    <div className={cn("flex flex-col items-center gap-6 w-full", className)}>
      {/* Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-purple-200 bg-gradient-to-b from-purple-50 via-white to-cyan-50 dark:border-cyan-700 dark:from-cyan-950 dark:via-purple-950 dark:to-zinc-900 shadow-lg p-6 md:p-10 flex flex-col items-center gap-4 transition-all duration-300">
        {/* Certificate Image */}
        <div className="w-full rounded-xl overflow-hidden border border-purple-100 dark:border-cyan-800 shadow-md">
          <img
            src={item.image}
            alt={item.title}
            className="w-full object-cover"
          />
        </div>

        {/* Certificate Info */}
        <div className="flex flex-col items-center gap-1 mt-2 text-center">
          <span className="text-xl font-bold text-purple-700 dark:text-cyan-200">
            {item.title}
          </span>
          <span className="text-sm font-semibold text-purple-500 dark:text-cyan-300">
            {item.issuer}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {item.date}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-purple-300 dark:border-cyan-700 bg-white dark:bg-zinc-900 text-purple-600 dark:text-cyan-300 flex items-center justify-center shadow hover:bg-purple-50 dark:hover:bg-cyan-950 transition"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                idx === current
                  ? "bg-purple-600 dark:bg-cyan-400 w-5"
                  : "bg-purple-200 dark:bg-cyan-800"
              )}
              aria-label={`Go to certificate ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-purple-300 dark:border-cyan-700 bg-white dark:bg-zinc-900 text-purple-600 dark:text-cyan-300 flex items-center justify-center shadow hover:bg-purple-50 dark:hover:bg-cyan-950 transition"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Counter */}
      <span className="text-xs text-slate-400 dark:text-slate-500">
        {current + 1} / {items.length}
      </span>
    </div>
  );
};