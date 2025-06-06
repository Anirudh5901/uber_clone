import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import LocationSearchPanel from "../components/LocationSearchPanel";
import { IoManSharp } from "react-icons/io5";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForCaptain from "../components/LookingForCaptain";
import WaitingForCaptain from "../components/WaitingForCaptain";
import axios from "axios";
import Button from "../components/Button";
import { UserDataContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [lookingForCaptainPanelOpen, setLookingForCaptainPanelOpen] =
    useState(false);
  const [waitingForCaptainPanelOpen, setWaitingForCaptainPanelOpen] =
    useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const vehiclePanelOpenRef = useRef(null);
  const confirmRidePanelOpenRef = useRef(null);
  const lookingForCaptainRef = useRef(null);
  const waitingForCaptainRef = useRef(null);

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", {
      userType: "user",
      userId: user._id,
    });
  }, [user, socket]);

  socket.on("ride-confirmed", (ride) => {
    console.log("ride confirmation details:", ride);
    setWaitingForCaptainPanelOpen(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log("Ride started: ", ride);
    setWaitingForCaptainPanelOpen(false);
    navigate("/riding", { state: { ride } });
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "75%",
        p: 24,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelOpenRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelOpenRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRidePanelOpenRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelOpenRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanelOpen]);

  useGSAP(() => {
    if (lookingForCaptainPanelOpen) {
      gsap.to(lookingForCaptainRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(lookingForCaptainRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [lookingForCaptainPanelOpen]);

  useGSAP(() => {
    if (waitingForCaptainPanelOpen) {
      gsap.to(waitingForCaptainRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForCaptainRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForCaptainPanelOpen]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setPickupSuggestions(response.data);
    } catch (error) {
      console.log("Error setting location", error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.log("Error while setting destination", error);
    }
  };

  const findTripHandler = async () => {
    if (pickup && destination) {
      setvehiclePanelOpen(true);
      setPanelOpen(false);
    } else {
      alert("Set pickup and destination locations");
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup,
            destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
    } catch (error) {
      console.log("Error while fetching fare", error);
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Create ride response", response);
    } catch (error) {
      console.log("error creating ride", error);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden z-2">
      {/* image/logo */}
      <div className="h-full w-full bg-violet-400">
        {/* image as temporary background */}
        <LiveTracking />
      </div>
      <div className=" flex flex-col justify-end  absolute w-full top-0 h-screen">
        <div className="h-[30%] p-5 bg-white relative">
          <IoMdArrowDropdownCircle
            className={`w-8 h-8 mt-1 cursor-pointer absolute right-6 top-4 ${
              panelOpen ? "" : "hidden"
            }`}
            onClick={() => {
              setPanelOpen(false);
            }}
          />
          <h4 className="text-2xl font-semibold mb-1">Find a trip</h4>
          <form
            className="flex flex-col gap-y-2"
            onSubmit={(e) => submitHandler(e)}
          >
            <div className="line absolute h-16 w-1 top-[37%] left-10 bg-gray-800 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              className="bg-[#eee] px-12 py-2 text-md rounded-lg w-full"
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              onChange={(e) => handlePickupChange(e)}
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              className="bg-[#eee] px-12 py-2 text-md rounded-lg w-full"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => handleDestinationChange(e)}
            />
          </form>
          <div className="w-full flex items-center justify-center p-2">
            <Button
              text={`Find a trip`}
              onClick={() => {
                findTripHandler();
              }}
            />
          </div>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelOpenRef}
        className="absolute z-10 bottom-0 p-5  bg-white w-full translate-y-full"
      >
        <VehiclePanel
          setvehiclePanelOpen={setvehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>
      <div
        ref={confirmRidePanelOpenRef}
        className="absolute z-10 bottom-0 p-5  bg-white w-full h-[75%]"
      >
        <ConfirmRide
          createRide={createRide}
          setVehiclePanelOpen={setvehiclePanelOpen}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setLookingForCaptainPanelOpen={setLookingForCaptainPanelOpen}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={lookingForCaptainRef}
        className="absolute z-10 bottom-0 p-5  bg-white w-full translate-y-full h-[69%]"
      >
        <LookingForCaptain
          setLookingForCaptainPanelOpen={setLookingForCaptainPanelOpen}
          setWaitingForCaptainPanelOpen={setWaitingForCaptainPanelOpen}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={waitingForCaptainRef}
        className="absolute z-10 bottom-0 p-5  bg-white w-full translate-y-full"
      >
        <WaitingForCaptain
          setWaitingForCaptainPanelOpen={setWaitingForCaptainPanelOpen}
          ride={ride}
          vehicleType={vehicleType}
        />
      </div>
    </div>
  );
};

export default Home;
