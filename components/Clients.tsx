"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { companies } from "@/data";

// ─── Certificate Data ──────────────────────────────────────────────────────────
const certificates = [
  {
    id: 1,
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "Nov 27,2025",
    image: "/udemy.png",
    credentialId: "CRED-001",
  },
  {
    id: 2,
    title: "Red Hat System Administrator I (RH124-RHA) - Ver.8.2",
    issuer: "Red Hat",
    date: "July 07,2025",
    image: "/RedHat2.png",
    credentialId: "CRED-002",
  },
  {
    id: 3,
    title: "Red Hat System Administrator II (RH134-RHA)-Ver.8.2",
    issuer: "Red Hat",
    date: "August 09,2025",
    image: "/RedHat2.png",
    credentialId: "CRED-003",
  },
  {
    id: 4,
    title: "Object Oriented Programming",
    issuer: "Iamneo",
    date: " December 05,2024",
    image: "/C++.png",
    credentialId: "CRED-004"
  }
];

// ─── SVG Icons ─────────────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const BadgeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ─── Certificate Carousel ──────────────────────────────────────────────────────
const CertificateCarousel = ({
  items,
}: {
  items: typeof certificates;
}) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const transition = (newIndex: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(newIndex);
      setAnimating(false);
    }, 300);
  };

  const prev = () =>
    transition(current === 0 ? items.length - 1 : current - 1, "left");

  const next = () =>
    transition(current === items.length - 1 ? 0 : current + 1, "right");

  const item = items[current];

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-8">
      {/* ── Main Card ── */}
      <div className="relative w-full group">
        {/* Ambient glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-500 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-700" />

        {/* Card body */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d0d1a] via-[#0f0a1e] to-[#050d1a] overflow-hidden shadow-2xl">
          
          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

          {/* Inner grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            {/* Certificate Image */}
            <div
              className={cn(
                "w-full md:w-[55%] rounded-xl overflow-hidden border border-white/10 shadow-lg transition-all duration-300",
                animating
                  ? direction === "right"
                    ? "-translate-x-4 opacity-0"
                    : "translate-x-4 opacity-0"
                  : "translate-x-0 opacity-100"
              )}
            >
              {/* Placeholder gradient when no image */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-900/60 via-violet-900/40 to-cyan-900/60 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback cert placeholder */}
                <div className="flex flex-col items-center gap-3 text-white/30 p-6 text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                    <path d="M9 10l2 2 4-4" />
                  </svg>
                  <span className="text-xs font-medium tracking-widest uppercase opacity-60">Certificate</span>
                </div>
              </div>
            </div>

            {/* Certificate Details */}
            <div
              className={cn(
                "flex flex-col gap-4 md:w-[45%] transition-all duration-300",
                animating
                  ? direction === "right"
                    ? "translate-x-4 opacity-0"
                    : "-translate-x-4 opacity-0"
                  : "translate-x-0 opacity-100"
              )}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase">
                <BadgeIcon />
                Verified
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                {item.title}
              </h3>

              {/* Issuer */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-white/40 uppercase tracking-widest font-medium">Issued by</span>
                <span className="text-base font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {item.issuer}
                </span>
              </div>

              {/* Date & Credential */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-white/40 uppercase tracking-widest font-medium">Date</span>
                <span className="text-sm text-white/70 font-medium">{item.date}</span>
              </div>

              <div className="pt-1 border-t border-white/5 mt-1">
                <span className="text-xs text-white/25 font-mono">ID: {item.credentialId}</span>
              </div>

              {/* Counter pill */}
              <div className="inline-flex self-start items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-mono">
                {String(current + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Bottom shimmer line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center gap-5">
        {/* Prev button */}
        <button
          onClick={prev}
          className="group/btn relative w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/40 text-white/50 hover:text-purple-300 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous certificate"
        >
          <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover/btn:bg-purple-500/10 blur transition-all duration-300" />
          <ChevronLeft />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => transition(idx, idx > current ? "right" : "left")}
              className={cn(
                "rounded-full transition-all duration-300",
                idx === current
                  ? "w-6 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to certificate ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          className="group/btn relative w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-500/40 text-white/50 hover:text-cyan-300 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Next certificate"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-500/0 group-hover/btn:bg-cyan-500/10 blur transition-all duration-300" />
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

// ─── Clients Section ───────────────────────────────────────────────────────────
const Clients = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="certificates">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-purple-700/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-cyan-700/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-16 px-4">
        {/* ── Heading ── */}
        <div className="flex flex-col items-center gap-3 text-center">
        
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            My{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Certificates
              </span>
              {/* Underline glow */}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-violet-400/60 to-cyan-500/0 rounded-full" />
            </span>
          </h2>
          <p className="text-sm text-white/40 max-w-md mt-1">
          I have completed multiple certificates that demonstrate my dedication to building practical skills and expanding my technical knowledge.
          </p>
        </div>

        {/* ── Carousel ── */}
        <CertificateCarousel items={certificates} />

        {/* ── Divider ── */}
        <div className="w-full max-w-3xl flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-xs text-white/20 uppercase tracking-widest font-medium">Trusted Platforms</span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* ── Company Logos ── */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-14">
          {companies.map(({ id, img, name, nameImg }) => (
            <div
              key={id}
              className="flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <img src={img} alt={name} className="md:w-10 w-5 object-contain" />
              <img src={nameImg} alt={name} className="md:w-24 w-20 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;