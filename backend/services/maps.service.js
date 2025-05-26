const axios = require("axios");
const captainModel = require("../models/captain.model");
module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//This function finds captains (or any location-based data) within a certain distance from a given point
module.exports.getCaptainsInTheRadius = async (
  ltd,
  lng,
  radius,
  vehicleType
) => {
  //radius in km
  console.log("VEHICLETYPE INPUT::", vehicleType);
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
  //location is by default in mongodb. it is the field in our documents that stores geographic coordinates
  //$geoWithin: MongoDb operator for finding locations within a shape
  //$centerSphere: Defines a circular area to search within
  //[ltd, lng]: the center point coordinates
  //radius/3963.2: Converts miles to radians(3963.2 is Earth's radius in miles)
  console.log("CAPTAINS IN RADIUS:", captains);
  const captainsWithChosenVehicleType = captains.filter(
    (captain) => captain.vehicle.vehicleType === vehicleType
  );
  console.log(
    "CAPTAINS WITH CHOSEN VEHICLE TYPE",
    captainsWithChosenVehicleType
  );
  return captainsWithChosenVehicleType;
};
