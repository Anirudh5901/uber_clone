import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" bg-cover bg-[url(https://w0.peakpx.com/wallpaper/805/388/HD-wallpaper-traffic-light-heart-signal-red-love.jpg)] h-screen w-full flex flex-col justify-between bg-red-400 pt-1">
        <img
          src="/Mover-removebg-preview.png"
          className="w-55 h-35 -ml-12.5 px-0 py-0 -mt-9"
        ></img>
        <div className="bg-white py-4 px-4 pb-7 flex flex-col items-center gap-y-4 rounded-tl-3xl rounded-tr-3xl">
          <h2 className="text-3xl font-bold">Get Started with Mover</h2>
          {/* // className="flex items-center justify-center w-full bg-black
          text-white py-3 rounded mt-5" */}
          <Button
            text={`Continue`}
            onClick={() => {
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
