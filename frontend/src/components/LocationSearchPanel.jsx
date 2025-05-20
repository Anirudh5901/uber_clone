import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({ setvehiclePanelOpen, setPanelOpen }) => {
  // sample array for locations
  const locations = [
    "Villa 99, Keerthi Richmond Villas, suncity, bandlaguda-jagir,Hyderabad, Telangana",
    "Villa 73, Keerthi Richmond Villas, suncity, bandlaguda-jagir,Hyderabad, Telangana",
    "Villa 30, Keerthi Richmond Villas, suncity, bandlaguda-jagir,Hyderabad, Telangana",
    "Villa 202, Keerthi Richmond Villas, suncity, bandlaguda-jagir,Hyderabad, Telangana",
  ];
  return (
    <div className="w-full h-full">
      {/* Sample data for now */}
      {locations.map((location, index) => (
        <div
          onClick={() => {
            setvehiclePanelOpen(true);
            setPanelOpen(false);
          }}
          key={index}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start hover:scale-105 hover:shadow-xl transition-all duration-200"
        >
          <FaLocationDot className="bg-[#eee] h-5 flex items-center justify-center w-5 rounded-full p-1" />
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
