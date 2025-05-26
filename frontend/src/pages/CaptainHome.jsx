/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const navigate = useNavigate();

  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(false);
  const [confirmRidePopUpPanelOpen, setConfirmRidePopUpPanelOpen] =
    useState(false);
  const [ride, setRide] = useState(null);

  const ridePopUpPanelOpenRef = useRef(null);
  const confirmRidePopUpPanelOpenRef = useRef(null);

  const { captain, updateCaptainLocation } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  const location = useLocation();
  const distanceTimeData = location.state?.distanceTimeData || null; // Get distance and time data from the state if available
  const fareEarned = location.state?.fare || null; // Get fare earned from the state if available
  console.log(
    "Received distanceTimeData from finishRide",
    distanceTimeData,
    fareEarned
  );
  useEffect(() => {
    socket.emit("join", {
      userType: "captain",
      userId: captain._id,
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log("Captain's current location", {
          //   userId: captain._id,
          //   location: {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude,
          //   },
          // });
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          updateCaptainLocation({
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, [captain._id, socket, updateCaptainLocation]);

  socket.on("new-ride", (data) => {
    console.log("New ride data: ", data);
    setRide(data);
    setRidePopUpPanelOpen(true);
  });

  const confirmRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRidePopUpPanelOpen(false);
      setConfirmRidePopUpPanelOpen(true);
    } catch (error) {
      console.log("Error confirming ride", error);
    }
  };

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
      <div className="bg-violet-400 h-3/5 w-full">
        <LiveTracking />
      </div>
      <div className="w-full h-2/5">
        <CaptainDetails
          distanceTimeData={distanceTimeData}
          fareEarned={fareEarned}
        />
      </div>
      <div
        ref={ridePopUpPanelOpenRef}
        className="absolute bottom-0 w-full bg-white p-5"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopUpPanelOpenRef}
        className="absolute bottom-0 w-full bg-white p-5 h-[90%]"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanelOpen={setConfirmRidePopUpPanelOpen}
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
