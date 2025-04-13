import HeroSectionStageOneHeader from "./hero-section-stage-1.header";
import HeroSectionStageOneIcons from "./hero-section-stage-1.icons";

interface HeroSectionStageOneProps {
  className?: string;
}

const HeroSectionStageOne: React.FC<HeroSectionStageOneProps> = ({}) => {
  return (
    <section className="h-[200vh] relative w-full">
      <div className="sticky top-0 inset-x-0 h-screen flex flex-col items-center justify-center">
        <HeroSectionStageOneHeader />
        <HeroSectionStageOneIcons />
      </div>
    </section>
  );
};

export default HeroSectionStageOne;
