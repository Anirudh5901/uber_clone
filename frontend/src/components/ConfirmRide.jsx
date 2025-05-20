import React from "react";
import Button from "./Button";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";

const ConfirmRide = ({
  setConfrimRidePanelOpen,
  setVehiclePanelOpen,
  setLookingForCaptainPanelOpen,
}) => {
  return (
    <div className="flex flex-col w-full items-center p-3 gap-y-3">
      <IoMdArrowDropdownCircle
        onClick={() => {
          setConfrimRidePanelOpen(false);
          setVehiclePanelOpen(true);
        }}
        className="w-8 h-8 mt-1 cursor-pointer absolute right-6 top-6"
      />
      <h3 className="text-2xl font-semibold mb-2">Confirm your ride:</h3>
      <div className="flex items-center justify-center">
        <img
          className="h-30"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
        />
      </div>

      <div className="w-full border-t-2 border-gray-500 ">
        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <FaLocationDot className="bg-[#eee] h-5 flex items-center justify-center w-5 rounded-full p-1" />
          <div>
            <h3 className="text-lg font-bold">Chosen</h3>
            <p>Location</p>
          </div>
        </div>

        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <FaMapLocationDot />
          <div>
            <h3 className="text-lg font-bold">Chosen</h3>
            <p>Destination</p>
          </div>
        </div>

        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <IoMdWallet />
          <div>
            <h3 className="text-lg font-bold">Ride</h3>
            <p>Fare</p>
          </div>
        </div>
      </div>
      <Button
        text={`Confirm Ride`}
        onClick={() => {
          setConfrimRidePanelOpen(false);
          setLookingForCaptainPanelOpen(true);
        }}
      />
    </div>
  );
};

export default ConfirmRide;
