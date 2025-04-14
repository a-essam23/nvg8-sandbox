"use client";
import { Tab, Tabs } from "@heroui/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTabs() {
  const [selectedKey, setSelectedKey] = useState<"production" | "sandbox">(
    "production"
  ); // ["production", "sandbox"]
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("sandbox")) {
      setSelectedKey("sandbox");
    } else {
      setSelectedKey("production");
    }
  }, [pathname]);
  const reroute = (key: "production" | "sandbox") => {
    setSelectedKey(key);
    console.log(key);
    if (key === "sandbox") return redirect(`/sandbox`);
    if (key === "production") return redirect(`/`);
  };
  return (
    <div className="fixed z-[20] left-0 top-0 w-full max-w-md px-2 sm:px-0">
      <Tabs
        // eslint-disable-next-line
        onSelectionChange={(key) => reroute(key as any)}
        selectedKey={selectedKey}
        variant="bordered"
      >
        <Tab key="production" title="Production" />
        <Tab key="sandbox" title="Sandbox" />
      </Tabs>
    </div>
  );
}
