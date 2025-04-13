"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSectionStageOne from "./hero-section-stage-1";
import { useHeroStore } from "@stores/hero-store";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { timeline, setTimeline } = useHeroStore();

  useEffect(() => {
    setTimeline(
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom",
          pin: true,
          scrub: 1,
          markers: true, // Helpful during development, remove in production
        },
      })
    );
    // Refresh ScrollTrigger when the component mounts
    ScrollTrigger.refresh();

    return () => {
      timeline?.kill();
      timeline?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white min-h-screen">
      <HeroSectionStageOne />
    </section>
  );
};

export default HeroSection;
