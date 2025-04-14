import HeroSectionStageOneHeader from "./hero-section-stage-1.header";
import HeroSectionStageOneIcons from "./hero-section-stage-1.icons";

interface HeroSectionStageOneProps {
  className?: string;
  stageHeight: number;
}

const HeroSectionStageOne: React.FC<HeroSectionStageOneProps> = ({
  stageHeight,
}) => {
  return (
    <section
      id="stage1"
      className="absolute inset-0 w-full bg-black opacity-0"
      style={{ height: `${stageHeight * 100}vh` }}
    >
      <div className="sticky top-0 inset-x-0 h-screen flex flex-col items-center justify-center">
        <HeroSectionStageOneHeader />
        <HeroSectionStageOneIcons />
      </div>
    </section>
  );
};

export default HeroSectionStageOne;
