"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSectionStageOne from "./hero-section-stage-1";
import { useHeroStore } from "@stores/hero-store";
import HeroSectionStageTwo from "./hero-section-stage-2";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  sandbox?: boolean;
}

const stageHeights = {
  stage1: 3,
  stage2: 2,
};

const HeroSection: React.FC<HeroSectionProps> = ({ sandbox }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { setTimeline } = useHeroStore();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(stageHeights.stage1 + stageHeights.stage2) * 100}%`,
        pin: true,
        scrub: 1,
      },
    });

    // Calculate total duration and create stage positions
    const stages = Object.keys(stageHeights);
    const totalHeight = Object.values(stageHeights).reduce((a, b) => a + b, 0);
    let position = 0;

    // Add stage labels and transitions dynamically
    stages.forEach((stage, index) => {
      const stageLength =
        stageHeights[stage as keyof typeof stageHeights] / totalHeight;
      const nextStage = stages[index + 1];

      // Add labels
      tl.addLabel(`${stage}Start`, position).addLabel(
        `${stage}End`,
        position + stageLength
      );

      // Set initial state at the start of timeline
      if (index === 0) {
        tl.set(`#${stage}`, { opacity: 1 }, 0);
      } else {
        tl.set(`#${stage}`, { opacity: 0 }, 0);
      }

      // Add transition to next stage
      if (nextStage) {
        const transitionPoint = position + stageLength;
        tl.set(
          [`#${stage}`, `#${nextStage}`],
          {
            opacity: (i) => (i === 0 ? 0 : 1),
          },
          transitionPoint
        );
      }

      position += stageLength;
    });

    setTimeline(tl);
    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <section
      ref={sectionRef}
      className="text-white relative"
      style={{
        height: `${(stageHeights.stage1 + stageHeights.stage2) * 100}vh`,
      }}
    >
      <HeroSectionStageOne stageHeight={stageHeights.stage1} />
      <HeroSectionStageTwo
        stageHeight={stageHeights.stage2}
        sandbox={sandbox}
      />
    </section>
  );
};

export default HeroSection;
