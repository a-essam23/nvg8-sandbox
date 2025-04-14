"use client";
import { useState, useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { Tab, Tabs } from "@heroui/tabs";

const RiveDisplay = () => {
  const StateMachine = "Trandition Desktop";
  const InputName = "Scrolling";
  const [isOpen, setIsOpen] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  const { RiveComponent, rive } = useRive({
    src: "animations/navigate_ui_transition_mobile_scroll.riv",
    artboard: "Trandition Desktop Scroll",
    stateMachines: StateMachine,
    animations: "Transition_IN",
    autoplay: true, // Set to true to autoplay the animation on mount,
  });
  const AnimationInput = useStateMachineInput(rive, StateMachine, InputName);

  useEffect(() => {
    if (AnimationInput) {
      AnimationInput.value = scrollValue;
    }
  }, [AnimationInput, scrollValue]);

  return (
    <div className="h-screen w-full flex flex-col justify-center">
      <div className="flex flex-grow border border-black relative">
        <RiveComponent />
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 bg-white/80 p-4 rounded-lg backdrop-blur-sm">
          <input
            type="range"
            min="0"
            max="100"
            value={scrollValue}
            onChange={(e) => setScrollValue(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium">{scrollValue}%</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          View Details
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
            <h3 className="text-lg font-medium mb-4">Rive Animation Details</h3>

            {rive?.contents && (
              <Tabs className="mb-4">
                <Tab
                  key="artboards"
                  title="Art Boards"
                  className="flex border-b mb-4"
                >
                  <div className="flex flex-col max-h-[40vh] overflow-y-scroll w-full">
                    {rive.contents.artboards?.map((artboard, index) => (
                      <div key={index} className="mb-4 p-3 border rounded-lg">
                        <h4 className="font-medium mb-2">{artboard.name}</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-1">
                              Animations
                            </h5>
                            <ul className="list-disc list-inside text-gray-600">
                              {artboard.animations.map((anim, i) => (
                                <li key={i}>{anim}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-700 mb-1">
                              State Machines
                            </h5>
                            <ul className="list-disc list-inside text-gray-600">
                              {artboard.stateMachines.map((sm, i) => (
                                <li key={i}>{sm.name}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab
                  key="animations"
                  title="Animations"
                  className="flex border-b mb-4"
                >
                  <div className="flex flex-col max-h-[40vh] overflow-y-scroll w-full">
                    {rive.contents.artboards?.map((artboard, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-medium mb-2">{artboard.name}</h4>
                        <ul className="list-disc list-inside text-gray-600 pl-2">
                          {artboard.animations.map((anim, i) => (
                            <li key={i} className="mb-1">
                              {anim}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab
                  key="stateMachines"
                  title="State Machines"
                  className="flex border-b mb-4"
                >
                  <div className="flex flex-col max-h-[40vh] overflow-y-scroll w-full">
                    {rive.contents.artboards?.map((artboard, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="font-medium mb-2">{artboard.name}</h4>
                        {artboard.stateMachines.map((sm, i) => (
                          <div key={i} className="mb-4 p-3 border rounded-lg">
                            <h5 className="font-medium text-gray-700 mb-2">
                              {sm.name}
                            </h5>
                            <h6 className="text-xs text-gray-500 uppercase mb-1">
                              Inputs
                            </h6>
                            <div className="pl-2">
                              {sm.inputs.map((input, idx) => (
                                <div
                                  key={idx}
                                  className="mb-2 p-2 bg-gray-50 rounded"
                                >
                                  <div>
                                    <span className="font-medium">Name:</span>{" "}
                                    {input.name}
                                  </div>
                                  <div>
                                    <span className="font-medium">Type:</span>{" "}
                                    {input.type === 56
                                      ? "Number"
                                      : input.type === 58
                                      ? "Trigger"
                                      : "Boolean"}
                                  </div>
                                  {input.initialValue !== undefined && (
                                    <div>
                                      <span className="font-medium">
                                        Initial Value:
                                      </span>{" "}
                                      {input.initialValue.toString()}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab key="JSON" title="Raw JSON" className="flex border-b mb-4">
                  <pre className="whitespace-pre-wrap text-gray-500 bg-gray-50 p-3 rounded-lg overflow-y-auto max-h-[50vh] w-full">
                    {JSON.stringify(rive?.contents, null, 2)}
                  </pre>
                </Tab>
              </Tabs>
            )}

            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiveDisplay;
