"use client";
import { useHeroStore } from "@stores/hero-store";
import Image from "next/image";
import { useEffect, useRef } from "react";

export interface HeadlineProps {
  start: string;
  icon: string | string[];
  end: string;
  // New props for animation control
  index?: number;
  iconAnimation?: 'up' | 'down' | 'left' | 'right';
  textStartDelay?: number;
  textEndDelay?: number;
}

const HeroStageTwoHeadline = ({ 
  start, 
  icon, 
  end, 
  index = 0,
  iconAnimation = 'up',
  textStartDelay = 0,
  textEndDelay = 0.1
}: HeadlineProps) => {
  const { timeline } = useHeroStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const startTextRef = useRef<HTMLDivElement | null>(null);
  const endTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!timeline || !containerRef.current || !iconRef.current || 
        !startTextRef.current || !endTextRef.current) return;

    const staggerDelay = index * 0.2; // Base stagger delay between lines
    
    // Icon animation configurations
    const iconAnimationProps = {
      up: { y: 20, yoyo: true },
      down: { y: -20, yoyo: true },
      left: { x: 20, yoyo: true },
      right: { x: -20, yoyo: true }
    }[iconAnimation];

    timeline
      .fromTo(
        [startTextRef.current],
        {
          opacity: 0,
          width: 0,
        },
        {
          opacity: 1,
          width: "auto",
          duration: 0.3,
          overflow: "visible",
          delay: staggerDelay + textStartDelay
        },
        "stage2Start"
      )
      .fromTo(
        [iconRef.current],
        {
          opacity: 0,
          scale: 0.8,
          ...iconAnimationProps
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          ...iconAnimationProps,
          delay: staggerDelay + 0.1
        },
        "stage2Start"
      )
      .fromTo(
        [endTextRef.current],
        {
          opacity: 0,
          width: 0,
        },
        {
          opacity: 1,
          width: "auto",
          duration: 0.3,
          overflow: "visible",
          delay: staggerDelay + textEndDelay
        },
        "stage2Start"
      );
  }, [timeline, index, iconAnimation, textStartDelay, textEndDelay]);
  return (
    <div
      ref={containerRef}
      className="flex items-center gap-2 font-oldschool-grotesk font-extrabold text-[62px]"
    >
      <span className="w-0 overflow-hidden" ref={startTextRef}>
        {start}
      </span>
      <div ref={iconRef}>
        {Array.isArray(icon) ? (
          <div className="flex">
            {icon.map((src, index) => (
              <Image key={index} src={src} height={82} width={82} alt="icon" />
            ))}
          </div>
        ) : (
          <Image src={icon} height={82} width={82} alt="icon" />
        )}
      </div>
      <span className="w-0 overflow-hidden" ref={endTextRef}>
        {end}
      </span>
    </div>
  );
};

export default HeroStageTwoHeadline;
