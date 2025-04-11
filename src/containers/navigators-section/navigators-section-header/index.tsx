import Image from "next/image";

const NavigatorsSectionHeader = () => {
  return (
    <div className="flex flex-col absolute translate-y-1/3">
      <div className="flex gap-2 justify-center items-center">
        <div className="relative">
          <span className="absolute left-2/4 top-2/4 -translate-x-3/4 -translate-y-2/4 z-[1] text-[#ff6d38]">
            1
          </span>
          <Image src="/icons/arrow.svg" alt="arrow" width={27} height={25} />
        </div>
        <div className="px-2 py-1 border border-black rounded-full">
          Introduction
        </div>
      </div>
      <div className="flex flex-col pb-24 text-[132.3px] leading-[0.8] tracking-[-0.04em] font-black text-[#141414] text-center">
        <span>Meet the</span>
        <span>Navigators</span>
      </div>
      <div className="flex flex-col text-[16px] leading-[1.2] tracking-[0.01em] font-medium text-inherit text-center">
        <span>Empowered digital avatars</span>
        <span>designed to represent you. </span>
      </div>
    </div>
  );
};

export default NavigatorsSectionHeader;
