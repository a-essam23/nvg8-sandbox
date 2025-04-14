import { create } from "zustand";

type IIcon = {
  src: string;
  alt: string;
};

type HeroStore = {
  timeline: gsap.core.Timeline | null;
  setTimeline: (timeline: gsap.core.Timeline) => void;
  iconGroups: IIcon[][];
  selectedIconGroup: number;
  setSelectedIconGroup: (index: number) => void;
};

export const useHeroStore = create<HeroStore>((set) => ({
  timeline: null,
  setTimeline: (timeline) => set({ timeline }),
  iconGroups: [
    [
      { src: "/icons/watch.svg", alt: "watch" },
      { src: "/icons/bag.svg", alt: "game" },
      { src: "/icons/shirt.svg", alt: "shirt" },
      { src: "/icons/game-mobile.svg", alt: "mobile" },
      { src: "/icons/song.svg", alt: "song" },
    ],
    [
      { src: "/icons/song.svg", alt: "song" },
      { src: "/icons/watch.svg", alt: "watch" },
      { src: "/icons/bag.svg", alt: "game" },
      { src: "/icons/shirt.svg", alt: "shirt" },
      { src: "/icons/game-mobile.svg", alt: "mobile" },
    ],
  ],
  selectedIconGroup: 1,
  setSelectedIconGroup: (index) => set({ selectedIconGroup: index }),
}));
