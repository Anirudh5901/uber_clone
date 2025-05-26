import axios from "axios";
import React from "react";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FinishRide = ({ setFinishRidePanelOpen, ride }) => {
  const navigate = useNavigate();

  console.log("Ride details in FinishRide: ", ride);

  const getDistanceTime = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/captain-get-distance-time`,
        {
          params: {
            origin: ride.pickup,
            destination: ride.destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Distance and time response in finish ride: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching distance and time", error);
    }
  };

  const endRide = async (distanceTimeData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/captain-home", {
          state: {
            distanceTimeData: distanceTimeData,
            fare: Math.round(ride?.fare, 2),
          },
        });
      }
    } catch (error) {
      console.log("Error finishing ride: ", error);
    }
  };

  const handleFullRide = async () => {
    const distanceTimeData = await getDistanceTime();
    if (distanceTimeData) {
      await endRide(distanceTimeData);
    } else {
      console.error("Failed to fetch distanceTimeData, ride not ended");
      // Optionally, show an error message to the user
    }
  };
  return (
    <div className="flex flex-col h-full w-full items-center justify-evenly gap-y-2 rounded-t-2xl relative">
      <IoMdArrowDropdownCircle
        className="absolute h-10 w-10 top-0 right-0"
        onClick={() => setFinishRidePanelOpen(false)}
      />
      <h2 className="text-xl font-bold">Finish Ride</h2>

      <div className="border-b-2 border-gray-500 w-full flex justify-center p-2">
        <div className="flex items-center justify-between p-3 w-full bg-black text-white rounded-xl">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">
              {ride?.user.fullname.firstname}
            </h3>
            {/* <p>3 Km away</p> */}
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-bold">Rs{Math.round(ride?.fare, 2)}</p>
            {/* <p>2:22 pm</p> */}
          </div>
        </div>
      </div>

      <div className="flex items- gap-x-5 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
        <FaLocationDot className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full p-1" />
        <div>
          <h3 className="text-lg font-bold">{ride?.pickup}</h3>
          <p>Location</p>
        </div>
      </div>

      <div className="flex items- gap-x-5 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
        <FaMapLocationDot className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full p-1" />
        <div>
          <h3 className="text-lg font-bold">{ride?.destination}</h3>
          <p>Destination</p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-y-3">
        <button
          className="flex justify-center items-center p-3 bg-green-400 text-white rounded-xl hover:scale-101 hover:opacity-80 transition-all duration-200 w-full"
          onClick={() => {
            handleFullRide();
          }}
        >
          Complete Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
