"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

interface ScrollVideoProps {
  src: string;
  className?: string;
  alt?: string;
  percentagePerSecond?: number;
}
gsap.registerPlugin(ScrollTrigger);

const ScrollVideo: React.FC<ScrollVideoProps> = ({
  src,
  alt,
  percentagePerSecond = 100,
  className = "",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");

  useEffect(() => {
    const video = videoRef.current!;
    const container = containerRef.current;

    console.log("Setting up video event listener");

    const handleLoadedMetadata = () => {
      console.log("Metadata loaded");
      const duration = video.duration; // seconds
      const scrollLength = `${duration * percentagePerSecond + 100}vh`; // px
      setSectionHeight(`${scrollLength}px`);
      console.log(scrollLength);

      // Wait for DOM update
      requestAnimationFrame(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            console.log("Scroll update", video.duration);
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
      });
    };

    // Try to handle already loaded videos
    if (video.readyState >= 2) {
      handleLoadedMetadata();
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    // Force load metadata
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height: sectionHeight }}
      className="relative w-full"
    >
      <video
        ref={videoRef}
        className={`sticky inset-0 w-full h-screen object-cover ${className}`}
        playsInline
        muted
        src={src}
        preload="metadata"
      />
    </section>
  );
};

export default ScrollVideo;
