import React, { useState } from "react";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = ({
  setRidePopUpPanelOpen,
  setConfirmRidePopUpPanelOpen,
}) => {
  const naviagte = useNavigate();
  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col h-full w-full items-center justify-evenly gap-y-2 rounded-t-2xl">
      <h2 className="text-xl font-bold">Ride For You:</h2>

      <div className="border-b-2 border-gray-500 w-full flex justify-center p-2">
        <div className="flex items-center justify-between p-3 w-full bg-black text-white rounded-xl">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">User name</h3>
            <p>3 Km away</p>
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-bold">Rs165</p>
            <p>2:22 pm</p>
          </div>
        </div>
      </div>

      <div className="flex items- gap-x-5 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
        <FaLocationDot className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full p-1" />
        <div>
          <h3 className="text-lg font-bold">User</h3>
          <p>Location</p>
        </div>
      </div>

      <div className="flex items- gap-x-5 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
        <FaMapLocationDot className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full p-1" />
        <div>
          <h3 className="text-lg font-bold">User</h3>
          <p>Destination</p>
        </div>
      </div>

      <form
        className="flex flex-col w-full gap-y-3"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          type="text"
          value={otp}
          placeholder="Enter OTP to confirm ride"
          className="w-full bg-[#eee] p-4 rounded-lg font-mono"
        />
        <button
          className="flex justify-center items-center p-3 bg-green-400 text-white rounded-xl hover:scale-101 hover:opacity-80 transition-all duration-200 w-full"
          onClick={() => {
            naviagte("/captain-riding");
          }}
        >
          Confirm
        </button>
        <div
          className="flex justify-center items-center p-3 bg-red-600 text-white rounded-xl  hover:scale-101 hover:opacity-80 transition-all duration-200 w-full"
          onClick={() => {
            setConfirmRidePopUpPanelOpen(false);
            setRidePopUpPanelOpen(false);
          }}
        >
          Cancel
        </div>
      </form>
    </div>
  );
};

export default ConfirmRidePopUp;
