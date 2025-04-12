"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

export interface VideoStage {
  src: string;
}

interface ScrollVideoProps {
  stages: VideoStage[];
  className?: string;
  // Each second of video takes X percent of the viewport height
  viewportHeightPerSecond?: number;
}

gsap.registerPlugin(ScrollTrigger);

const ScrollVideoStages: React.FC<ScrollVideoProps> = ({
  stages,
  className = "",
  viewportHeightPerSecond = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [totalHeight, setTotalHeight] = useState("100vh");
  const [durations, setDurations] = useState<number[]>([]);

  useEffect(() => {
    const loadDurations = async () => {
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

    loadDurations();
  }, [stages]);

  useEffect(() => {
    if (!containerRef.current || durations.length === 0) return;

    // Calculate scroll length based on video duration and percentagePerSecond
    // For example: if percentagePerSecond is 100, each second of video takes 100vh
    const scrollLengths = durations.map(
      (duration) => duration * viewportHeightPerSecond
    );
    const totalScrollLength = scrollLengths.reduce(
      (acc, curr) => acc + curr,
      0
    );
    console.log(scrollLengths, totalScrollLength);
    setTotalHeight(`${totalScrollLength * 100}vh`);

    let previousEnd = 0;
    const triggers = stages.map((_, index) => {
      const start = previousEnd;
      const end = start + scrollLengths[index];
      previousEnd = end;

      const _start = `${start * 100}%`;
      const _end = `${end * 100}%`;
      console.log(`Video ${index}`, _start, _end);
      return ScrollTrigger.create({
        trigger: containerRef.current,
        start: `${start * 100}% top`,
        end: `${end * 100}% bottom`,
        markers: true,
        onUpdate: (self) => {
          const video = videoRefs.current[index];
          if (video && video.duration) {
            const progress = self.progress || 0;
            video.currentTime = Math.min(
              progress * video.duration,
              video.duration - 0.001
            );
          }
        },
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [durations, viewportHeightPerSecond, stages]);

  return (
    <div
      ref={containerRef}
      style={{ height: totalHeight }}
      className="relative w-full"
    >
      {stages.map((stage, index) => (
        <div key={index} className="sticky top-0 h-screen w-full">
          <video
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            className={`w-full h-screen object-cover ${className}`}
            playsInline
            muted
            src={stage.src}
            preload="metadata"
          />
        </div>
      ))}
    </div>
  );
};

export default ScrollVideoStages;
