import React, { useContext, useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { IoIosSpeedometer } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = ({ distanceTimeData, fareEarned }) => {
  const context = useContext(CaptainDataContext);
  console.log("CaptainDetails context:", context);

  const { captain, totalDistance, totalFare, updateTotals } = context;
  console.log("CAPTAIN:", captain);
  // State to track the last processed distance and fare
  const [lastProcessedDistance, setLastProcessedDistance] = useState(null);
  const [lastProcessedFare, setLastProcessedFare] = useState(null);

  useEffect(() => {
    // Only proceed if we have new ride data
    if (distanceTimeData && fareEarned !== undefined) {
      const newDistance = distanceTimeData.distance.value / 1000; // Convert meters to km

      // Check if this is new data by comparing with last processed values
      if (
        newDistance !== lastProcessedDistance ||
        fareEarned !== lastProcessedFare
      ) {
        // Update the totals in context
        updateTotals(newDistance, fareEarned);

        // Store the new values as the last processed ones
        setLastProcessedDistance(newDistance);
        setLastProcessedFare(fareEarned);
      }
    }
  }, [distanceTimeData, fareEarned, updateTotals]);

  if (!context) {
    return (
      <div>Context not available - Component is outside CaptainContext</div>
    );
  }

  if (!captain) {
    return <div className="bg-white p-4">Loading captain details...</div>;
  }

  return (
    <div className=" bg-white flex flex-col items-center justify-evenly gap-y-3 h-full">
      <div className="flex w-full justify-between px-3 py-1 ">
        <img
          className="h-20"
          src={
            captain?.vehicle.vehicleType === "car"
              ? "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
              : captain?.vehicle.vehicleType === "motorcycle"
              ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          }
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">{captain.fullname.firstname}</h2>
          <h4 className="text-xl font-semibold">{captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">{captain.vehicle.vehicleType}</p>
        </div>
      </div>

      <div className="flex justify-evenly w-9/10 p-4 bg-violet-400 rounded-xl hover:scale-105 transition-all duration-300">
        <div className="flex flex-col justify-center items-center">
          <IoIosSpeedometer className="h-15 w-15 text-white" />
          <h2 className="text-xl font-bold text-white">{totalDistance}</h2>
          <h3 className="text-lg text-white">Distance</h3>
        </div>

        <div className="flex flex-col justify-center items-center">
          <GiTakeMyMoney className="h-15 w-15 text-white" />
          <h2 className="text-xl font-bold text-white">Rs {totalFare}</h2>
          <h3 className="text-lg text-white">Amount Earned</h3>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
