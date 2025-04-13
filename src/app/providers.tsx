"use client";
import { HeroUIProvider } from "@heroui/react";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default Providers;
