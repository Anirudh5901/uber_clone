import React from "react";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";

const RidePopUp = ({
  ride,
  setRidePopUpPanelOpen,
  setConfirmRidePopUpPanelOpen,
  confirmRide,
}) => {
  console.log("Ride details", ride);
  return (
    <div className="flex flex-col w-full items-center justify-center gap-y-2 rounded-t-2xl">
      <h2 className="text-xl font-bold">Ride For You:</h2>

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

      <div className="flex w-full justify-evenly">
        <div
          className="flex justify-center items-center p-3 bg-red-600 text-white rounded-xl w-2/5 hover:scale-101 hover:opacity-80 transition-all duration-200"
          onClick={() => {
            setRidePopUpPanelOpen(false);
          }}
        >
          Ignore
        </div>
        <div
          className="flex justify-center items-center p-3 bg-green-400 text-white rounded-xl w-2/5 hover:scale-101 hover:opacity-80 transition-all duration-200"
          onClick={() => {
            setConfirmRidePopUpPanelOpen(true);
            confirmRide();
          }}
        >
          Accept
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
