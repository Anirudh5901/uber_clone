import React from "react";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const LookingForCaptain = ({
  setLookingForCaptainPanelOpen,
  pickup,
  destination,
  fare,
  vehicleType,
  //setWaitingForCaptainPanelOpen,
}) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLookingForCaptainPanelOpen(false);
  //     setWaitingForCaptainPanelOpen(true);
  //   }, 30000);
  // }, [setLookingForCaptainPanelOpen, setWaitingForCaptainPanelOpen]);
  return (
    <div className="flex flex-col w-full items-center p-4 gap-y-4">
      <MdCancel
        onClick={() => {
          setLookingForCaptainPanelOpen(false);
        }}
        className="w-8 h-8 mt-1 cursor-pointer absolute right-6 top-6"
      />
      <h3 className="text-2xl font-semibold mb-2">Looking For Captain...</h3>
      <div className="flex items-center justify-center">
        <img
          className="h-30"
          src={
            vehicleType === "car"
              ? "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
              : vehicleType === "motorcycle"
              ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          }
        />
      </div>

      <div className="w-full border-t-2 border-gray-500 ">
        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <FaLocationDot className="bg-[#eee] h-5 flex items-center justify-center w-5 rounded-full p-1" />
          <div className="min-w-0">
            <h3 className="text-lg font-bold truncate">{pickup}</h3>
            <p>Location</p>
          </div>
        </div>

        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <FaMapLocationDot />
          <div className="min-w-0">
            <h3 className="text-lg font-bold truncate">{destination}</h3>
            <p>Destination</p>
          </div>
        </div>

        <div className="flex items- gap-x-3 p-3 w-full items-start shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
          <IoMdWallet />
          <div>
            <h3 className="text-lg font-bold">Rs{fare[vehicleType]}</h3>
            <p>Fare</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForCaptain;
