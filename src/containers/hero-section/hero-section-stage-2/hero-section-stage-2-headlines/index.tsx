import HeroStageTwoHeadline, { HeadlineProps } from "./headline";

const HeroSectionStageTwoHeadlines = () => {
  const lines: HeadlineProps[] = [
    {
      start: "Your favorite",
      icon: "/icons/song.svg",
      end: "songs.",
      iconAnimation: "up",
      textStartDelay: 0,
      textEndDelay: 0.2,
    },
    {
      start: "That",
      icon: "/icons/watch.svg",
      end: "must-see movie.",
      iconAnimation: "left",
      textStartDelay: 0.1,
      textEndDelay: 0.3,
    },
    {
      start: "Your top",
      icon: "/icons/game-desktop.svg",
      end: "interests and",
      iconAnimation: "down",
      textStartDelay: 0.1,
      textEndDelay: 0.2,
    },
    {
      start: "All your shopping",
      icon: ["/icons/bag.svg", "/icons/shirt.svg"],
      end: "habits.",
      iconAnimation: "up",
      textStartDelay: 0,
      textEndDelay: 0.2,
    },
  ];

  return (
    <div className="absolute flex flex-col justify-center items-center select-none box-border opacity-100 text-[rgb(20,20,20)] text-[48.645px] font-black tracking-[-1.9458px] leading-[43.7805px] whitespace-nowrap text-center">
      {lines.map((line, index) => (
        <HeroStageTwoHeadline key={index} {...line} index={index} />
      ))}
    </div>
  );
};

export default HeroSectionStageTwoHeadlines;
