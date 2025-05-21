import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanelOpen, setFinishRidePanelOpen] = useState(false);
  const finishRidePanelOpenRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanelOpen) {
      gsap.to(finishRidePanelOpenRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelOpenRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanelOpen]);
  return (
    <div className="h-screen relative overflow-hidden">
      <div className="bg-violet-400 h-4/5 w-full"></div>
      <div
        className="w-full h-1/5 bg-white flex items-center justify-evenly p-5 "
        onClick={() => {
          setFinishRidePanelOpen(true);
        }}
      >
        <h4 className="font-bold text-xl w-2/5 text-black">4Km Away</h4>
        <div className="p-3 bg-green-500 text-white font-semibold rounded-xl hover:scale-101 hover:opacity-95 w-3/5 flex items-center justify-center">
          Complete Ride
        </div>
      </div>

      <div
        ref={finishRidePanelOpenRef}
        className="absolute w-full bottom-0 translate-y-full bg-white p-5 "
      >
        <FinishRide setFinishRidePanelOpen={setFinishRidePanelOpen} />
      </div>
    </div>
  );
};

export default CaptainRiding;
