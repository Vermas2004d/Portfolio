"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Animated Counter Hook ─────────────────────────────────────────────────────
const useCounter = (target: number, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

// ─── Intersection Observer Hook ───────────────────────────────────────────────
const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
};

// ─── SVG Icons ─────────────────────────────────────────────────────────────────
const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const FireIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/>
  </svg>
);
const TrophyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
    <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ─── Skill Bar ─────────────────────────────────────────────────────────────────
const SkillBar = ({ label, value, color, inView }: { label: string; value: number; color: string; inView: boolean }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between items-center">
      <span className="text-xs text-white/50 font-medium">{label}</span>
      <span className="text-xs text-white/30 font-mono">{value}%</span>
    </div>
    <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: inView ? `${value}%` : "0%",
          background: color,
          transitionDelay: "400ms",
        }}
      />
    </div>
  </div>
);

// ─── Main Hero Stat Card (DSA) ────────────────────────────────────────────────
const HeroStatCard = ({ inView }: { inView: boolean }) => {
  const count = useCounter(150, 1800, inView);

  return (
    <div className="relative group h-full">
      {/* Outer glow */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-purple-500 via-violet-500 to-cyan-500 opacity-40 group-hover:opacity-70 blur-md transition-opacity duration-700" />

      <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#0e0a1f] via-[#0c0c1e] to-[#060d1c] overflow-hidden p-7 flex flex-col justify-between">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {/* Shimmer top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/80 to-transparent" />

        <div className="relative z-10 flex flex-col gap-6 h-full">
          {/* Icon + label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 self-start">
              <span className="text-purple-400"><CodeIcon /></span>
              <span className="text-purple-300 text-xs font-semibold tracking-wider uppercase">DSA Grind</span>
            </div>
            {/* Live badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-semibold tracking-wider uppercase">Active</span>
            </div>
          </div>

          {/* Big number */}
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-1 leading-none">
              <span
                className="text-7xl md:text-8xl font-black bg-gradient-to-br from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent tabular-nums"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {count}
              </span>
              <span className="text-4xl font-black text-purple-400 mb-2">+</span>
            </div>
            <p className="text-white/40 text-sm font-medium tracking-wide">Problems Solved</p>
          </div>

          {/* Platforms */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase tracking-widest text-white/25 font-semibold">Platforms</span>
            <div className="flex gap-2 flex-wrap">
              {["LeetCode", "Striver's A2Z", "GFG"].map((p) => (
                <span key={p} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-medium">
                  <CheckIcon />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Skill bars */}
          <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-white/5">
            <SkillBar label="Arrays & Hashing" value={90} color="linear-gradient(90deg,#a855f7,#8b5cf6)" inView={inView} />
            <SkillBar label="Trees & Graphs" value={72} color="linear-gradient(90deg,#7c3aed,#06b6d4)" inView={inView} />
            <SkillBar label="Dynamic Programming" value={58} color="linear-gradient(90deg,#06b6d4,#3b82f6)" inView={inView} />
          </div>
        </div>

        {/* Shimmer bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>
    </div>
  );
};

// ─── Small Achievement Card ────────────────────────────────────────────────────
const AchievementCard = ({
  icon,
  label,
  title,
  description,
  tag,
  gradient,
  delay = 0,
  inView,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  tag: string;
  gradient: string;
  delay?: number;
  inView: boolean;
}) => (
  <div
    className="relative group transition-all duration-700"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    <div className={`absolute -inset-[1px] rounded-2xl opacity-20 group-hover:opacity-50 blur-sm transition-opacity duration-500 ${gradient}`} />
    <div className="relative rounded-2xl border border-white/8 bg-gradient-to-br from-[#0e0a1f]/90 to-[#060d1c]/90 p-5 flex gap-4 items-start backdrop-blur-sm overflow-hidden">
      {/* Left accent line */}
      <div className={`absolute left-0 top-4 bottom-4 w-[2px] rounded-full ${gradient}`} />

      {/* Icon */}
      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} bg-opacity-10 border border-white/10 text-white`}>
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">{label}</span>
        <span className="text-white font-bold text-sm leading-snug">{title}</span>
        <p className="text-white/40 text-xs leading-relaxed">{description}</p>
        <span className="mt-1.5 inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-mono">
          {tag}
        </span>
      </div>
    </div>
  </div>
);

// ─── Floating star decorations ─────────────────────────────────────────────────
const FloatingStar = ({ style }: { style: React.CSSProperties }) => (
  <span className="absolute text-purple-400/20 animate-pulse" style={style}>
    <StarIcon />
  </span>
);

// ─── Main Section ──────────────────────────────────────────────────────────────
const Achievements = () => {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" id="achievements">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-700/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyan-700/8 blur-3xl pointer-events-none" />

      {/* Floating stars */}
      <FloatingStar style={{ top: "12%", left: "6%", animationDelay: "0s" }} />
      <FloatingStar style={{ top: "30%", right: "8%", animationDelay: "0.8s" }} />
      <FloatingStar style={{ bottom: "20%", left: "10%", animationDelay: "1.4s" }} />
      <FloatingStar style={{ bottom: "10%", right: "15%", animationDelay: "0.4s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center gap-14">

        {/* ── Heading ── */}
        <div
          className="flex flex-col items-center gap-3 text-center transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
            <span className="text-purple-400"><FireIcon /></span>
            <span className="text-purple-300 text-xs font-semibold tracking-[0.2em] uppercase">Highlights</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            My{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                Achievements
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-purple-500/0 via-violet-400/70 to-cyan-500/0" />
            </span>
          </h2>
          <p className="text-white/35 text-sm max-w-sm leading-relaxed">
            Consistency over intensity — a few things I'm genuinely proud of.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">

          {/* Hero stat — spans full height left */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "100ms",
            }}
          >
            <HeroStatCard inView={inView} />
          </div>

          {/* Right column — stacked small cards */}
          <div className="flex flex-col gap-4">
            <AchievementCard
              icon={<TrophyIcon />}
              label="Milestone"
              title="Completed Striver's A2Z DSA Sheet"
              description="Systematically worked through 150+ handpicked problems covering every core DSA topic — arrays to graphs."
              tag="2024"
              gradient="from-purple-500 to-violet-600"
              delay={200}
              inView={inView}
            />

            <AchievementCard
              icon={<CodeIcon />}
              label="Platform"
              title="150+ LeetCode Problems"
              description="Solved across Easy, Medium, and Hard difficulty — sharpening problem-solving intuition and speed."
              tag="LeetCode · Active"
              gradient="from-violet-500 to-cyan-500"
              delay={350}
              inView={inView}
            />

            {/* ── Add your own here ── */}
            {/* <AchievementCard
              icon={<StarIcon />}
              label="Achievement"
              title="Your Achievement Here"
              description="Replace this with something you've done — a project shipped, a course completed, anything you're proud of."
              tag="2024"
              gradient="from-cyan-500 to-blue-500"
              delay={500}
              inView={inView}
            /> */}
          </div>
        </div>

        {/* ── Bottom quote strip ── */}
        <div
          className="w-full max-w-2xl transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transitionDelay: "600ms" }}
        >
          <div className="relative rounded-2xl border border-white/6 bg-white/[0.02] px-7 py-5 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
            <p className="text-white/30 text-sm italic leading-relaxed">
              "The journey of a thousand problems begins with a single line of code."
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Achievements;