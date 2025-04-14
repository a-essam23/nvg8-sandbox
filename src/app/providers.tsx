"use client";
import PageTabs from "@components/page-tab";
import { HeroUIProvider } from "@heroui/react";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HeroUIProvider>
      <PageTabs />
      {children}
    </HeroUIProvider>
  );
};

export default Providers;
