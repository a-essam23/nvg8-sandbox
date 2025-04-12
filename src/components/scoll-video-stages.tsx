"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

export interface VideoStage {
  src: string;
}

interface ScrollVideoStagesProps {
  stages: VideoStage[];
  className?: string;
  pixelsPerSecond?: number;
}

gsap.registerPlugin(ScrollTrigger);

const ScrollVideoStages: React.FC<ScrollVideoStagesProps> = ({
  stages,
  className = "",
  pixelsPerSecond = 150,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [durations, setDurations] = useState<number[]>([]);

  useEffect(() => {
    const loadVideoDurations = async () => {
      const durationPromises = stages.map(async (_, index) => {
        const video = videoRefs.current[index];
        if (!video) return 0;

        if (video.readyState >= 2) {
          return video.duration;
        }

        return new Promise<number>((resolve) => {
          video.addEventListener("loadedmetadata", () => {
            resolve(video.duration);
          });
          video.load();
        });
      });

      const loadedDurations = await Promise.all(durationPromises);
      setDurations(loadedDurations);
    };

    loadVideoDurations();
  }, [stages]);

  useEffect(() => {
    if (!containerRef.current || durations.length === 0) return;

    const totalDuration = durations.reduce((acc, curr) => acc + curr, 0);
    const scrollLength =
      totalDuration * pixelsPerSecond * durations.length +
      containerRef.current.offsetHeight;

    setSectionHeight(scrollLength + "px");

    let cumulativeTime = 0;
    const triggers = stages.map((_, index) => {
      const startTime = cumulativeTime;
      const endTime = startTime + durations[index];
      const startProgress = startTime / totalDuration;
      const endProgress = endTime / totalDuration;
      cumulativeTime = endTime;

      return ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollLength - (containerRef?.current?.offsetHeight || 0)}`,
        onUpdate: (self) => {
          const video = videoRefs.current[index];
          if (!video || !video.duration) return;

          const progress = self.progress;
          if (progress >= startProgress && progress <= endProgress) {
            const videoProgress =
              (progress - startProgress) / (endProgress - startProgress);
            video.currentTime = videoProgress * video.duration;
            video.style.opacity = "1";
          } else {
            video.style.opacity = "0";
            video.currentTime = progress < startProgress ? 0 : video.duration;
          }
        },
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [durations, pixelsPerSecond, stages]);

  return (
    <section
      ref={containerRef}
      style={{ height: sectionHeight }}
      className="relative w-full"
    >
      <div className="sticky inset-0 w-full h-screen">
        {stages.map((stage, index) => (
          <video
            key={index}
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${className}`}
            playsInline
            muted
            src={stage.src}
            preload="metadata"
            style={{ opacity: index === 0 ? 1 : 0 }}
          />
        ))}
      </div>
    </section>
  );
};

export default ScrollVideoStages;
