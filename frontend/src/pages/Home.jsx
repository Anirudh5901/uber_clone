import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);

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

  return (
    <div className="relative h-screen">
      {/* image/logo */}
      <div className="h-full w-full bg-violet-400">
        {/* image as temporary background */}
      </div>
      <div className=" flex flex-col justify-end  absolute w-full top-0 h-screen">
        <div className="h-[25%] p-5 bg-white relative">
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
              }}
              className="bg-[#eee] px-12 py-2 text-md rounded-lg w-full"
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-md rounded-lg w-full"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
        <div ref={panelRef} className=" bg-white h-0 mb-0">
          <LocationSearchPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
