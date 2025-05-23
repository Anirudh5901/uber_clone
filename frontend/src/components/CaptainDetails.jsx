import React, { useContext } from "react";
import { MdAccessTime } from "react-icons/md";
import { IoIosSpeedometer } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const context = useContext(CaptainDataContext);
  console.log("CaptainDetails context:", context);

  if (!context) {
    return (
      <div>Context not available - Component is outside CaptainContext</div>
    );
  }

  const { captain } = context;
  console.log("CAPTAIN:", captain);

  if (!captain) {
    return <div className="bg-white p-4">Loading captain details...</div>;
  }
  return (
    <div className=" bg-white flex flex-col items-center justify-evenly gap-y-3 h-full">
      <div className="flex w-full justify-between px-3 py-1 ">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">{captain.fullname.firstname}</h2>
          <h4 className="text-xl font-semibold">{captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">{captain.vehicle.vehicleType}</p>
        </div>
      </div>

      <div className="flex justify-evenly w-9/10 p-4 bg-violet-400 rounded-xl hover:scale-105 transition-all duration-300">
        <div className="flex flex-col justify-center items-center">
          <MdAccessTime className="h-15 w-15 text-white" />
          <h2 className="text-xl font-bold text-white">10.2</h2>
          <h3 className="text-lg text-white">Hours Online</h3>
        </div>

        <div className="flex flex-col justify-center items-center">
          <IoIosSpeedometer className="h-15 w-15 text-white" />
          <h2 className="text-xl font-bold text-white">34 Km</h2>
          <h3 className="text-lg text-white">Disatnce</h3>
        </div>

        <div className="flex flex-col justify-center items-center">
          <GiTakeMyMoney className="h-15 w-15 text-white" />
          <h2 className="text-xl font-bold text-white">Rs 547</h2>
          <h3 className="text-lg text-white">Amount Earned</h3>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
