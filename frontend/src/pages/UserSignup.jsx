/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      console.log(`${import.meta.env.VITE_BASE_URL}/users/register`);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log("Error submitting user signup data", error);
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    navigate("/home");
  };
  return (
    <div className="bg-white h-screen w-full p-7 flex flex-col justify-evenly">
      <div className="mb-12">
        {/* <img
          src="/Mover-black.png"
          className=" w-65 h-55 mx-auto px-0 py-0 -mt-9 -z-10"
        ></img> */}
        <form
          className="flex flex-col -mt-10"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h2 className="text-2xl mb-4 font-semibold">Register as User:</h2>
          <h3 className="text-xl font-medium mb-2">Enter your name:</h3>
          <div className="flex gap-x-2">
            <div className="flex flex-col">
              <p>First name:</p>
              <input
                className="bg-[#eeeeee] mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                placeholder="firstname"
              />
            </div>
            <div className="flex flex-col">
              <p>Last name:</p>
              <input
                className="bg-[#eeeeee] mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                placeholder="last name"
              />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Enter your email</h3>
          <input
            className="bg-[#eeeeee] mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl font-medium mb-2">Enter Password: </h3>
          <input
            className="bg-[#eeeeee] mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <Button text={`Signup`} />
        </form>
      </div>
      <div className="mt-5 flex justify-center items-center mb-5">
        <Button
          text={`Back`}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
};

export default UserSignup;
