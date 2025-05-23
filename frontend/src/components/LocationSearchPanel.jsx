import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (element) => {
    if (activeField === "pickup") {
      setPickup(element.description);
    } else {
      setDestination(element.description);
    }
  };

  return (
    <div className="w-full h-full">
      {suggestions.map((element, index) => (
        <div
          onClick={() => {
            handleSuggestionClick(element);
          }}
          key={index}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start hover:scale-105 hover:shadow-xl transition-all duration-200"
        >
          <FaLocationDot className="bg-[#eee] h-5 flex items-center justify-center w-5 rounded-full p-1" />
          <h4 className="font-medium">{element.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
