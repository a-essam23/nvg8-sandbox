import ScrollVideo from "@components/scroll-video";
import NavigatorsSectionHeader from "./navigators-section-header";

const NavigatorsSection = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full">
      {/* <NavigatorsSectionHeader /> */}
      <ScrollVideo
        src="/videos/NAVIGATE_4K_S10_loop@sm.mp4"
        alt="navigation-s10-video"
      />
    </section>
  );
};

export default NavigatorsSection;
