import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useContext, useEffect, useRef, useState } from "react";
import FinishRide from "../components/FinishRide";
import { useLocation } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainRiding = () => {
  const [finishRidePanelOpen, setFinishRidePanelOpen] = useState(false);
  const [distanceToDestination, setDistanceToDestination] = useState(null);

  const finishRidePanelOpenRef = useRef(null);

  const location = useLocation();
  const rideData = location.state?.ride;
  const { captain } = useContext(CaptainDataContext);

  // Fetch distance between captain and pickup location
  useEffect(() => {
    const getDistanceToPickup = async () => {
      if (!captain?.location || !rideData?.destination) return;

      try {
        // Format captain's location as a string (latitude,longitude)
        const origin = `${captain.location.ltd},${captain.location.lng}`;
        const destination = rideData.destination; // Pickup location as string

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/captain-get-distance-time`,
          {
            params: {
              origin,
              destination,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Distance to destination response:", response.data);
        setDistanceToDestination(response.data.distance.value / 1000); // Convert meters to km
      } catch (error) {
        console.error("Error fetching distance to destination:", error);
        setDistanceToDestination(null); // Handle error gracefully
      }
    };

    getDistanceToPickup();
    // Run every 10 seconds to match location updates
    const interval = setInterval(getDistanceToPickup, 10000);
    return () => clearInterval(interval); // Cleanup interval
  }, [captain?.location, rideData?.destination]);

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
      <div className="bg-violet-400 h-4/5 w-full">
        <LiveTracking />
      </div>
      <div
        className="w-full h-1/5 bg-white flex items-center justify-evenly p-5 "
        onClick={() => {
          setFinishRidePanelOpen(true);
        }}
      >
        <h4 className="font-bold text-xl w-2/5 text-black">
          {distanceToDestination !== null
            ? `${distanceToDestination.toFixed(2)} km Away`
            : "Calculating..."}
        </h4>
        <div className="p-3 bg-green-500 text-white font-semibold rounded-xl hover:scale-101 hover:opacity-95 w-3/5 flex items-center justify-center">
          Complete Ride
        </div>
      </div>

      <div
        ref={finishRidePanelOpenRef}
        className="absolute w-full bottom-0 translate-y-full bg-white p-5 "
      >
        <FinishRide
          ride={rideData}
          setFinishRidePanelOpen={setFinishRidePanelOpen}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
