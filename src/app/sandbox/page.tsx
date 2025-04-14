import RiveDisplay from "@components/rive-display";
import HeroSection from "@containers/hero-section";
import NavigatorsSection from "@containers/navigators-section";

const SandboxPage = () => {
  return (
    <div className="flex flex-col">
      <RiveDisplay />
      <HeroSection />
      <NavigatorsSection sandbox />
    </div>
  );
};

export default SandboxPage;
