import React, { useEffect } from "react";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { IoMdArrowDropdownCircle, IoMdWallet } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const LookingForCaptain = ({
  setLookingForCaptainPanelOpen,
  setWaitingForCaptainPanelOpen,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setLookingForCaptainPanelOpen(false);
      setWaitingForCaptainPanelOpen(true);
    }, 30000);
  }, [setLookingForCaptainPanelOpen, setWaitingForCaptainPanelOpen]);
  return (
    <div className="flex flex-col w-full items-center p-3 gap-y-3">
      <MdCancel
        onClick={() => {
          // setConfrimRidePanelOpen(false);
          // setVehiclePanelOpen(true);
          setLookingForCaptainPanelOpen(false);
        }}
        className="w-8 h-8 mt-1 cursor-pointer absolute right-6 top-6"
      />
      <h3 className="text-2xl font-semibold mb-2">Looking For Captain:</h3>
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
    </div>
  );
};

export default LookingForCaptain;
