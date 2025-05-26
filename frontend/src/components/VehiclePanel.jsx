import React from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoManSharp } from "react-icons/io5";

const VehiclePanel = ({
  setvehiclePanelOpen,
  setConfirmRidePanelOpen,
  fare,
  setVehicleType,
}) => {
  return (
    <div>
      <IoMdArrowDropdownCircle
        onClick={() => setvehiclePanelOpen(false)}
        className="w-8 h-8 mt-1 cursor-pointer absolute right-6 top-4"
      />
      <h2 className="text-xl font-bold mb-2">Choose a Vehicle: </h2>
      <div
        className="flex items-center justify-between mb-3 shadow-lg rounded-xl border-2 border-gray-50 active:border-black hover:cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200"
        onClick={() => {
          setConfirmRidePanelOpen(true);
          //setvehiclePanelOpen(false);
          setVehicleType("car");
        }}
      >
        <img
          className="h-10"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-1/2 flex flex-col justify-center items-center ">
          <h4 className="flex text-md font-bold">
            MoverGo{" "}
            <span>
              <IoManSharp />
            </span>
            4
          </h4>
          {/* <h5>2 mins away</h5> */}
          <p className="text-sm text-gray-500">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">Rs{Math.round(fare.car, 2)}</h2>
      </div>

      <div
        className="flex items-center justify-between w-full shadow-lg rounded-xl border-2 border-gray-50 active:border-black hover:cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200"
        onClick={() => {
          setConfirmRidePanelOpen(true);
          //setvehiclePanelOpen(false);
          setVehicleType("motorcycle");
        }}
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h4 className="flex text-md font-bold">
            MoverMoto{" "}
            <span>
              <IoManSharp />
            </span>
            1
          </h4>
          {/* <h5>2 mins away</h5> */}
          <p className="text-sm text-gray-500">Affordable, motorcycle rides</p>
        </div>
        <h2 className="text-2xl font-semibold">
          Rs{Math.round(fare.motorcycle, 2)}
        </h2>
      </div>

      <div
        className="flex items-center justify-between w-full shadow-lg rounded-xl border-2 border-gray-50 active:border-black hover:cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-200"
        onClick={() => {
          setConfirmRidePanelOpen(true);
          //setvehiclePanelOpen(false);
          setVehicleType("auto");
        }}
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />

        <div className="w-1/2 flex flex-col justify-center items-center p-3">
          <h4 className="flex text-md font-bold">
            MoverAuto{" "}
            <span>
              <IoManSharp />
            </span>
            2-3
          </h4>
          {/* <h5>2 mins away</h5> */}
          <p className="text-sm text-gray-500">Affordable, auto rides</p>
        </div>
        <h2 className="text-2xl font-semibold">Rs{fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
