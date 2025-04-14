import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHeroStore } from "@/stores/hero-store";

interface HeroSectionStageOneIconsProps {
  className?: string;
}

const HeroSectionStageOneIcons: React.FC<
  HeroSectionStageOneIconsProps
> = ({}) => {
  const { timeline, iconGroups, selectedIconGroup } = useHeroStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[][]>([[], []]);
  const loopTlRef = useRef<gsap.core.Timeline>(null);

  useEffect(() => {
    const currentRefs = iconRefs.current[selectedIconGroup];
    if (!currentRefs?.length) return;

    if (!loopTlRef.current)
      loopTlRef.current = gsap.timeline({
        repeat: -1,
        onRepeat: () => {
          // Switch groups after each complete loop
          const nextGroup = (selectedIconGroup + 1) % iconGroups.length;
          useHeroStore.getState().setSelectedIconGroup(nextGroup);
        },
      });
    const loopTl = loopTlRef.current;
    const stagger = 0.1;
    const duration = 0.2;
    const ease: gsap.EaseString = "power1.inOut";
    const firstIconDelay = 0.85;

    const firstIcon = currentRefs[0];
    const restOfIcons = currentRefs.slice(1);

    // First icon animation with delay
    loopTl
      .fromTo(
        firstIcon,
        { scale: 0 },
        {
          scale: 1,
          duration,
          ease,
          delay: 1,
        }
      )
      // Rest of the icons appear
      .fromTo(
        restOfIcons,
        { scale: 0 },
        {
          scale: 1,
          duration,
          stagger,
          ease,
          delay: 0.35,
        },
        `-=${firstIconDelay}`
      )
      // Add delay here before disappearing
      .to(firstIcon, {
        scale: 0,
        duration,
        delay: 1.5,
      })
      .to(
        restOfIcons,
        {
          scale: 0,
          duration,
          stagger,
          delay: 1,
        },
        `-=${firstIconDelay}`
      );
    if (!timeline) return;
    timeline
      .fromTo(
        currentRefs,
        {
          yPercent: 0,
        },
        {
          yPercent: -100,
          stagger: 0.1,
          duration: 0.15,
          onStart: () => {
            loopTl.pause();
            gsap.set(currentRefs, { scale: 1 });
          },
          onReverseComplete: () => {
            loopTl.resume();
          },
        },
        "stage1Start+=0.01"
      )
      .fromTo(
        containerRef.current,
        {
          bottom: 0,
          y: 0,
        },
        {
          bottom: "50%",
          yPercent: 100,
          padding: 0,
          scale: 0.5,
          // y: "-25%",
          duration: 0.2, // Animation will take 20% of the timeline
        },
        "stage1Start+=0.05"
      );

    return () => {
      loopTl.kill();
    };
    // eslint-disable-next-line
  }, [timeline, selectedIconGroup]);

  return (
    <div
      ref={containerRef}
      className="absolute w-full flex flex-1 justify-center items-center bottom-0 max-w-full p-4"
    >
      {iconGroups.map((iconGroup, groupIndex) => (
        <div
          key={`group-${groupIndex}`}
          style={{
            display: selectedIconGroup === groupIndex ? "flex" : "none",
          }}
          className="flex justify-center items-center w-full"
        >
          {iconGroup.map((icon, iconIndex) => (
            <div
              key={icon.alt}
              ref={(el) => {
                if (!iconRefs.current[groupIndex]) {
                  iconRefs.current[groupIndex] = [];
                }
                iconRefs.current[groupIndex][iconIndex] = el;
              }}
              className="relative w-full aspect-square"
            >
              <Image src={icon.src} alt={icon.alt} fill />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HeroSectionStageOneIcons;
