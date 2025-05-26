import React, { useEffect, useState } from "react";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { IoMdArrowDropdownCircle, IoMdWallet } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const WaitingForCaptain = ({
  setWaitingForCaptainPanelOpen,
  ride,
  vehicleType,
}) => {
  console.log("Waiting for captain Ride details::: ", ride);

  const [distanceToPickup, setDistanceToPickup] = useState(null); // State for distance
  // const { captain } = useContext(CaptainDataContext);

  // Fetch distance between captain and pickup location
  useEffect(() => {
    const getDistanceToPickup = async () => {
      if (
        !ride?.captain?.location?.ltd ||
        !ride?.captain?.location?.lng ||
        !ride?.pickup
      ) {
        console.log("Missing data:", {
          captainLocation: ride?.captain?.location,
          pickup: ride?.pickup,
        });
        return;
      }

      try {
        // Format captain's location as a string (latitude,longitude)
        const origin = `${ride?.captain.location.ltd},${ride?.captain.location.lng}`;
        const destination = ride?.pickup; // Pickup location as string

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`,
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

        console.log("Distance to pickup response:", response.data);
        setDistanceToPickup(response.data.distance.value / 1000); // Convert meters to km
      } catch (error) {
        console.error("Error fetching distance to pickup:", error);
        setDistanceToPickup(null); // Handle error gracefully
      }
    };

    getDistanceToPickup();
    // Update every 10 seconds to match location updates
    const interval = setInterval(getDistanceToPickup, 10000);
    return () => clearInterval(interval); // Cleanup interval
  }, [ride?.captain?.location, ride?.pickup]);

  return (
    <div className="flex flex-col w-full items-center p-3 gap-y-3">
      <MdCancel
        onClick={() => {
          setWaitingForCaptainPanelOpen(false);
        }}
        className="w-8 h-8 mt-1 cursor-pointer absolute right-2 top-2"
      />
      <div className="flex w-full justify-between p-2">
        <h3 className=" text-xl font-semibold">
          Your Captain will pick you up soon...
        </h3>
        <div className="flex flex-col bg-black items-center justify-center text-white w-15 h-15">
          <h4 className="font-bold text-xl">
            {distanceToPickup !== null
              ? `${distanceToPickup.toFixed(2)}`
              : "..."}
          </h4>
          <p>Kms</p>
        </div>
      </div>

      <div className="flex w-full justify-between p-2 border-t-2 border-gray-500">
        <img
          className="h-15"
          src={
            vehicleType === "car"
              ? "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
              : vehicleType === "motorcycle"
              ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          }
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">
            {ride?.captain.fullname.firstname}
          </h2>
          <h4 className="text-xl font-semibold">
            {ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">
            {ride?.captain.vehicle.color} {ride?.captain.vehicle.vehicleType}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full p-3 items-center border-y-2 border-gray-500">
        <p className="font-bold">Your OTP:</p>
        <div className="bg-black text-white font-medium p-2 rounded-2xl">
          {ride?.otp}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <FaLocationDot className="bg-[#eee] h-5 flex items-center justify-center w-5 rounded-full p-1" />
          <div>
            <h3 className="text-lg font-bold">{ride?.pickup}</h3>
            <p>Location</p>
          </div>
        </div>

        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <FaMapLocationDot />
          <div>
            <h3 className="text-lg font-bold">{ride?.destination}</h3>
            <p>Destination</p>
          </div>
        </div>

        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <IoMdWallet />
          <div>
            <h3 className="text-lg font-bold">{Math.round(ride?.fare, 2)}</h3>
            <p>Fare</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForCaptain;
