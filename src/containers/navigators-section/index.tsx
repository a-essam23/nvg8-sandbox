import ScrollVideoStagesTimeline from "@components/scoll-video-stages-timeline";
import NavigatorsSectionHeader from "./navigators-section-header";
import ScrollVideoStages, { VideoStage } from "@components/scroll-video-stages";

const NavigatorsSection = () => {
  const stages: VideoStage[] = [
    {
      src: "videos/NAVIGATE_4K_S10-scrolly@sm.mp4",
      // loopSrc: "videos/NAVIGATE_4K_S10_loop@sm.mp4",
    },
    {
      src: "videos/NAVIGATE_4K_S20-scrolly@sm.mp4",
      // loopSrc: "videos/NAVIGATE_4K_S10_loop@sm.mp4",
    },
  ];
  return (
    <section className="flex flex-col h-full justify-center items-center w-full">
      {/* <NavigatorsSectionHeader /> */}
      <ScrollVideoStagesTimeline stages={stages} />
    </section>
  );
};

export default NavigatorsSection;
