"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import { GlobeDemo } from "./GridGlobe";
import { div } from "motion/react-client";
import animationData from '@/data/confetti.json'
import Lottie from "lottie-react";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";

// ✅ Types
interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  id?: number;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}

// ✅ BentoGrid Wrapper
const BentoGrid = ({ children, className = "" }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 auto-rows-[240px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

// ✅ BentoGrid Item
export const BentoGridItem = ({
  title,
  description,
  className = "",
  children,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: BentoGridItemProps) => {
  const imageSrc = img || spareImg;

  const [copied , setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('contact@jsmastery.pro');

    setCopied(true);
  }

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 border border-white/10",
        className
      )}
    >
      {imageSrc && (
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-3xl",
            id === 6 && "flex justify-center items-center",
          
          )}
        >
          <Image
            src={imageSrc}
            alt={title ?? "Bento item"}
            fill
            className={cn("object-cover object-center", imgClassName)}
            sizes="(max-width: 640px) 100vw, 33vw"
            unoptimized
          />
        </div>
      )}

      <div
        className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"}`}
      >
        {spareImg && (
          <img
            src={spareImg}
            alt={spareImg}
            className={"object-cover object-center w-full h-full"}
          />
        )}
      </div>

      {id === 6 && (
        <BackgroundGradientAnimation>
          {/* <div className="absolute z-50 flex items-center justify-center text-white font-bold" /> */}
        </BackgroundGradientAnimation> 
      )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10",
          )}
        >
        <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10">
          {description}
        </div>
        <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
          {title}
        </div>
        {id == 2 && <GlobeDemo />}

        {id === 3 && (
          <div className="flex gap-1 lg-gap-5 w-fit absolute -right-3 lg:-right-2">
            <div className="flex flex-col gap-3 lg:gap-8">
              {["React.js", "Next.js", "TypeScript"].map((item) => (
                <span
                  key={item}
                  className="py-2 lg:py-2 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132e]"
                >
                  {item}
                </span>
              ))}

              <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
            </div>

            

            <div className="flex flex-col gap-3 lg:gap-8">
              <span className="py-4 px-3 rounded-lg text-center bg-[#10132e]" />
              {["Vue.js", "AWS", "MongoDB"].map((item) => (
                <span
                  key={item}
                  className="py-2 lg:py-2 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132e]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {id == 6 && (
          <div className="mt-5 relative">
            <div className={`absolute -bottom-5 right-0`}>
            <Lottie
                loop={copied}
                autoplay={copied}
                animationData={animationData}
                rendererSettings={{
                  preserveAspectRatio: 'xMidTMid slice',
                }}/>
            </div>

                  <MagicButton
                  title={copied ? 'Email copied' : 'Copy my email'}
                  icon={<IoCopyOutline />}
                  position="left"
                  otherClasses="!bg-[#161a31]"
                  handleClick={handleCopy}
                   />

          </div>
        )}


      </div>
    </div>
  );
};

export default BentoGrid;
