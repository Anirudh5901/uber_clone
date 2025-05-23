import React, { useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {
  const navigate = useNavigate();

  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(false);
  const [confirmRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen] =
    useState(false);

  const ridePopUpPanelOpenRef = useRef(null);
  const confirmRidePopUpPanelOpenRef = useRef(null);

  useGSAP(() => {
    if (ridePopUpPanelOpen) {
      gsap.to(ridePopUpPanelOpenRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelOpenRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanelOpen]);

  useGSAP(() => {
    if (confirmRidePopUpPanelOpen) {
      gsap.to(confirmRidePopUpPanelOpenRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpPanelOpenRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUpPanelOpen]);
  return (
    <div className="h-screen relative overflow-hidden">
      <div
        className=" flex justify-center items-center rounded-full absolute top-2 right-2 h-10 w-10 bg-white text-black"
        onClick={() => {
          navigate("/captain/logout");
        }}
      >
        <CiLogout className="h-5 w-5" />
      </div>
      <div className="bg-violet-400 h-3/5 w-full"></div>
      <div className="w-full h-2/5">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopUpPanelOpenRef}
        className="absolute bottom-0 w-full bg-white p-5"
      >
        <RidePopUp
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}
        />
      </div>
      <div
        ref={confirmRidePopUpPanelOpenRef}
        className="absolute bottom-0 w-full bg-white p-5 h-[90%]"
      >
        <ConfirmRidePopUp
          setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
