const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  //we need to calculate fare for three differnet types of vehicles: car, auto, motorcycle
  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1,
  };

  const fare = {
    auto:
      baseFare.auto +
      (distanceTime.distance.value * perKmRate.auto) / 1000 +
      (distanceTime.duration.value * perMinuteRate.auto) / 60,
    car:
      baseFare.car +
      (distanceTime.distance.value * perKmRate.car) / 1000 +
      (distanceTime.duration.value * perMinuteRate.car) / 60,
    motorcycle:
      baseFare.motorcycle +
      (distanceTime.distance.value * perKmRate.motorcycle) / 1000 +
      (distanceTime.duration.value * perMinuteRate.motorcycle) / 60,
  };

  return fare;
}

function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};
