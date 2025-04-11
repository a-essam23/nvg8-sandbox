"use client";
import Rive from "@rive-app/react-canvas";

const RiveTest = () => {
  return (
    <Rive
      src="/animations/navigate_ui_menu_rollover.riv"
      stateMachines="bumpy"
    />
  );
};

export default RiveTest;
