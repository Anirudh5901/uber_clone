import React from "react";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { IoMdArrowDropdownCircle, IoMdWallet } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const WaitingForCaptain = ({ setWaitingForCaptainPanelOpen }) => {
  return (
    <div className="flex flex-col w-full items-center p-3 gap-y-3">
      <MdCancel
        onClick={() => {
          // setConfrimRidePanelOpen(false);
          // setVehiclePanelOpen(true);
          setWaitingForCaptainPanelOpen(false);
        }}
        className="w-8 h-8 mt-1 cursor-pointer absolute right-2 top-2"
      />
      <div className="flex w-full justify-between p-2">
        <h3 className=" text-xl font-semibold">
          Your Captain will pick you up soon...
        </h3>
        <div className="flex flex-col bg-black items-center justify-center text-white w-15 h-15">
          <h4 className="font-bold text-xl">2</h4>
          <p>mins</p>
        </div>
      </div>

      <div className="flex w-full justify-between p-2 border-t-2 border-gray-500">
        <img
          className="h-15"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">Sarthak</h2>
          <h4 className="text-xl font-semibold">MP04 AB 1234</h4>
          <p className="text-sm text-gray-600">Maruti Suzuku Alto</p>
        </div>
      </div>

      <div className="w-full">
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
    </div>
  );
};

export default WaitingForCaptain;
