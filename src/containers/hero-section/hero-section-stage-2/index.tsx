"use client";

import { useHeroStore } from "@stores/hero-store";
import cn from "@utils/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import HeroSectionStageTwoHeadlines from "./hero-section-stage-2-headlines";

interface HeroSectionStageTwoProps {
  stageHeight: number;
  sandbox?: boolean;
}

const HeroSectionStageTwo: React.FC<HeroSectionStageTwoProps> = ({
  stageHeight,
  sandbox,
}) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const { selectedIconGroup, iconGroups, timeline } = useHeroStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!timeline || !containerRef.current || iconRefs.current.length === 0)
      return;

    timeline.fromTo(
      containerRef.current,
      {
        width: "50%", // Starting width matching the initial className
      },
      {
        width: "30%",
        onStart: () => {
          console.log("started");
          setAnimationStarted(true);
        },
        onReverseComplete: () => {
          setAnimationStarted(false);
        },
      },
      "stage2Start"
    );
  }, [timeline, selectedIconGroup]);

  return (
    <section
      id="stage2"
      className={cn(
        "absolute inset-0 w-full opacity-0 bg-black",
        animationStarted && "bg-white"
      )}
      style={{ height: `${stageHeight * 100}vh` }}
    >
      <div className="sticky top-0 inset-x-0 h-screen flex flex-col items-center justify-center">
        <div
          ref={containerRef}
          className="absolute flex w-1/2 flex-1 justify-center items-center p-4"
        >
          {iconGroups[selectedIconGroup].map((icon, index) => (
            <div
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              key={icon.alt}
              className="relative aspect-square w-full"
            >
              <Image src={icon.src} alt={icon.alt} fill />
            </div>
          ))}
        </div>
        {sandbox && <HeroSectionStageTwoHeadlines />}
      </div>
    </section>
  );
};

export default HeroSectionStageTwo;
