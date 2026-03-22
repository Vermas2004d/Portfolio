"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = React.useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "normal" : "reverse",
      );
    }
  }, [direction]);

  const getSpeed = React.useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]);

  const addAnimation = React.useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
    setStart(true);
  }, [addAnimation]);
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-16 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li key={idx}
            className="relative w-[90vw] max-w-full shrink-0 rounded-2xl border border-purple-200 bg-gradient-to-b from-purple-50 via-white to-cyan-50 p-5 md:p-16 md:w-[60vw] shadow-lg transition duration-300 hover:scale-[1.01] dark:border-cyan-700 dark:bg-gradient-to-b dark:from-cyan-950 dark:via-purple-950 dark:to-zinc-900"
           >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)] rounded-2xl bg-purple-200/40 dark:bg-cyan-700/40"
              ></div>
              <span className="relative z-20 text-sm md:text-lg leading-[1.6] font-medium text-slate-800 dark:text-slate-100">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                    <div className="me-3">
                        <img src="/profile.svg" alt="profile" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-xl leading-[1.6] font-bold text-purple-700 dark:text-cyan-200">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-purple-500 dark:text-cyan-300 font-semibold">
                    {item.title}
                  </span>
                    </div>
                  
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
