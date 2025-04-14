import ScrollVideoStages, { VideoStage } from "@components/scoll-video-stages";
import NavigatorsSectionHeader from "./navigators-section-header";

interface NavigatorsSectionProps {
  sandbox?: boolean;
}

const NavigatorsSection: React.FC<NavigatorsSectionProps> = ({ sandbox }) => {
  const stages: VideoStage[] = [
    {
      src: "videos/NAVIGATE_4K_S10-scrolly@sm.mp4",
      loopSrc: "videos/NAVIGATE_4K_S10_loop@sm.mp4",
    },
    {
      src: "videos/NAVIGATE_4K_S20-scrolly@sm.mp4",
      loopSrc: "videos/NAVIGATE_4K_S20_loop@sm.mp4",
    },
    {
      src: "videos/NAVIGATE_4K_S25-scrolly@sm.mp4",
      loopSrc: "videos/NAVIGATE_4K_S25_loop@sm.mp4",
    },
    {
      src: "videos/NAVIGATE_4K_S30-scrolly@sm.mp4",
      loopSrc: "videos/NAVIGATE_4K_S30_loop@sm.mp4",
    },
  ];
  return (
    <section className="flex flex-col h-full justify-center items-center w-full">
      {sandbox && <NavigatorsSectionHeader />}
      <ScrollVideoStages stages={stages} />
    </section>
  );
};

export default NavigatorsSection;
