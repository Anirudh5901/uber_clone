import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [captainData, setcaptainData] = useState({});
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [type, setType] = useState("car");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setcaptainData({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: type,
      },
    });
    console.log(captainData);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setColor("");
    setPlate("");
    setCapacity("");
    setType("");
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
          <h2 className="text-2xl mb-4 font-semibold mt-4">
            Register as Captain:
          </h2>
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
          <h3 className="text-xl font-medium mb-2">Enter Vehicle details: </h3>
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2">
              <div className="flex flex-col">
                <p>Color:</p>
                <input
                  className="bg-[#eeeeee] mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type="text"
                  placeholder="color"
                />
              </div>
              <div className="flex flex-col">
                <p>Plate:</p>
                <input
                  className="bg-[#eeeeee] mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                  value={plate}
                  required
                  onChange={(e) => setPlate(e.target.value)}
                  type="text"
                  placeholder="plate"
                />
              </div>
            </div>

            <div className="flex gap-x-2">
              <div className="flex flex-col">
                <p>Capacity:</p>
                <input
                  className="bg-[#eeeeee] mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  type="number"
                  placeholder="capacity"
                />
              </div>
              <div className="flex flex-col">
                <p>Type:</p>
                <input
                  className="bg-[#eeeeee] mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  type="text"
                  required
                  placeholder="type"
                />
              </div>
            </div>
          </div>
          <Button text={`Signup`} />
        </form>
      </div>
      <div className="mt-5 flex items-center justify-center mb-5">
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

export default CaptainSignup;
