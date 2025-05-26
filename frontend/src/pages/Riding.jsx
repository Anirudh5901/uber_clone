import React, { useContext } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import Button from "../components/Button";
import { FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);

  socket.on("ride-ended", () => {
    navigate("/home");
  });
  return (
    <div className="h-screen relative">
      <div
        className=" flex justify-center items-center rounded-full absolute top-2 right-2 h-10 w-10 bg-white text-black"
        onClick={() => {
          navigate("/home");
        }}
      >
        <FaHome className="h-5 w-5" />
      </div>
      <div className="bg-violet-400 h-1/2 w-full">
        <LiveTracking />
      </div>
      <div className="w-full h-1/2 bg-white">
        <div className="flex w-full justify-between px-3 py-1 ">
          <img
            className="h-15"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {ride?.captain.fullname.firstname}
            </h2>
            <h4 className="text-xl font-semibold">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">
              {ride?.captain.vehicle.color} {ride?.captain.vehicle.vehicleType}
            </p>
          </div>
        </div>

        <div className="flex  gap-x-3 p-3 w-full items-start shadow-lg hover:scale-102 hover:shadow-xl transition-all duration-200">
          <FaMapLocationDot />
          <div>
            <h3 className="text-lg font-bold">{ride?.destination}</h3>
            <p>Destination</p>
          </div>
        </div>

        <div className="flex  gap-x-3 p-3 w-full items-start shadow-lg hover:scale-102 hover:shadow-xl transition-all duration-200">
          <IoMdWallet />
          <div>
            <h3 className="text-lg font-bold">Rs{ride?.fare}</h3>
            <p>Fare</p>
          </div>
        </div>
        {/* <div className="flex justify-center items-center mt-4 w-full">
          <Button text={`Make a Payment`} />
        </div> */}
      </div>
    </div>
  );
};

export default Riding;
