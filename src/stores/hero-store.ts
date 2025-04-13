import { create } from "zustand";

type IIcon = {
  src: string;
  alt: string;
  ref?: React.RefObject<HTMLDivElement | null>;
};

type HeroStore = {
  timeline: gsap.core.Timeline | null;
  setTimeline: (timeline: gsap.core.Timeline) => void;
  iconGroups: IIcon[][];
  setIconGroupRefs: (
    index: number,
    refs: React.RefObject<HTMLElement | null | undefined>[]
  ) => void;
  selectedIconGroup: number;
  setSelectedIconGroup: (index: number) => void;
};

export const useHeroStore = create<HeroStore>((set, get) => ({
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
  setIconGroupRefs: (index, refs) => {
    const iconGroups = get().iconGroups;
    const updatedGroup = iconGroups[index].map((icon, i) => ({
      ...icon,
      ref: refs[i],
    }));
    const newIconGroups = [...iconGroups];
    newIconGroups[index] = updatedGroup as IIcon[];
    set({ iconGroups: newIconGroups });
  },
  selectedIconGroup: 1,
  setSelectedIconGroup: (index) => set({ selectedIconGroup: index }),
}));
