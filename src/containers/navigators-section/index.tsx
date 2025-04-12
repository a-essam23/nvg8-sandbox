import ScrollVideoStages, { VideoStage } from "@components/scoll-video-stages";

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
    {
      src: "videos/NAVIGATE_4K_S25-scrolly@sm.mp4",
    },
    {
      src: "videos/NAVIGATE_4K_S30-scrolly@sm.mp4",
    },
  ];
  return (
    <section className="flex flex-col h-full justify-center items-center w-full">
      {/* <NavigatorsSectionHeader /> */}
      {/* <ScrollVideoStages stages={stages} /> */}
      <ScrollVideoStages stages={stages} />
    </section>
  );
};

export default NavigatorsSection;
