import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { useHeroStore } from "@/stores/hero-store";

interface HeroSectionStageOneIconsProps {
  className?: string;
}

const HeroSectionStageOneIcons: React.FC<
  HeroSectionStageOneIconsProps
> = ({}) => {
  const { timeline, iconGroups, setIconGroupRefs, selectedIconGroup } =
    useHeroStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[][]>([[], []]);

  useEffect(() => {
    // Update refs in store
    setIconGroupRefs(
      selectedIconGroup,
      iconRefs.current[selectedIconGroup].map((el) => ({ current: el }))
    );
  }, [selectedIconGroup, setIconGroupRefs]);

  useEffect(() => {
    const currentRefs = iconRefs.current[selectedIconGroup];
    if (!currentRefs?.length) return;

    const loopTl = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        // Switch groups after each complete loop
        const nextGroup = (selectedIconGroup + 1) % iconGroups.length;
        useHeroStore.getState().setSelectedIconGroup(nextGroup);
      },
    });
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

    // Scroll animation
    timeline
      ?.to(currentRefs, {
        yPercent: -100,
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "+=50%",
          scrub: true,
          onEnter: () => {
            loopTl.pause();
            gsap.set(currentRefs, { scale: 1 });
          },
          onLeaveBack: () => {
            loopTl.restart();
          },
        },
      })
      .fromTo(
        containerRef.current,
        { scale: 1 },
        {
          scale: 0.5,
          top: "50%",
          y: "-25%",
          ease: "power2.inOut",
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom",
            scrub: true,
          },
        }
      );

    return () => {
      loopTl.kill();
    };
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
