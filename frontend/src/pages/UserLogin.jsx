import React, { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    console.log(userData);
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
          New here?{" "}
          <Link to={`/signup`} className="text-blue-600">
            Create a new Account
          </Link>
        </p>
      </div>
      <div className="mt-5 flex flex-col mb-5">
        <h3 className="text-xl font-medium mb-2">
          Are you one of our awesome Captains?
        </h3>

        <Button
          text={`Sign in as Captain`}
          onClick={() => {
            navigate("/captain-login");
          }}
        />
      </div>
    </div>
  );
};

export default UserLogin;
