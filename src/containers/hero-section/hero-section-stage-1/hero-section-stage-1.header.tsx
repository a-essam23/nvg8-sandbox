"use client";
import { useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useHeroStore } from "@/stores/hero-store";
import gsap from "gsap";

const HeroSectionStageOneHeader: React.FC = () => {
  const { timeline } = useHeroStore();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timeline) return;

    // Create separate entrance timeline
    const entranceTl = gsap.timeline({ delay: 0.5 });
    entranceTl.fromTo(
      [titleRef.current, subtitleRef.current, buttonRef.current],
      {
        y: 200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "sine",
      }
    );

    // Scroll-triggered fade out
    timeline.to(
      [titleRef.current, subtitleRef.current, buttonRef.current],
      {
        y: -100,
        opacity: 0,
      },
      "stage1Start+=0.05"
    );

    return () => {
      entranceTl.kill();
    };
  }, [timeline]);

  return (
    <div className="flex flex-col flex-grow items-center pt-20">
      <h1
        ref={titleRef}
        className="font-extrabold text-7xl md:text-8xl text-center mb-6 max-w-3xl leading-tight font-oldschool-grotesk whitespace-pre-wrap"
      >
        Your data runs the world
      </h1>
      <div className="flex flex-col h-max">
        <p
          ref={subtitleRef}
          className="text-xs md:text-sm text-center mb-4 font-bold"
        >
          Start earning from it today.
        </p>
        <div ref={buttonRef}>
          <Button
            startContent={
              <Image
                src={"icons/extension.svg"}
                alt="extension-icon"
                width={24}
                height={20}
                className="brightness-75"
              />
            }
            color="success"
            radius="full"
            className="hover:rounded w-max"
          >
            Download Rewards Extension
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionStageOneHeader;
