import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
    console.log(captainData);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="bg-white h-screen w-full p-7 flex flex-col justify-evenly">
      <div className="">
        {/* <img
          src="/Mover-black.png"
          className=" w-65 h-55 mx-auto px-0 py-0 -mt-9 -z-10"
        ></img> */}
        <form
          className="flex flex-col -mt-8"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-xl font-medium mb-2">What is your email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl font-medium mb-2">Enter Password: </h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <Button text={`Login`} />
        </form>
        <p>
          Join our fleet of Captains:{" "}
          <Link to={`/captain-signup`} className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div className="mt-5 flex flex-col mb-5">
        <h3 className="text-xl font-medium mb-2">
          Want to reach your destination with the help of our Captains?
        </h3>

        <Button
          text={`Sign in as User`}
          onClick={() => {
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
};

export default CaptainLogin;
