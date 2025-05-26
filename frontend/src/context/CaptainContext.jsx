import { createContext, useEffect, useState } from "react";

export const CaptainDataContext = createContext([]);

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalFare, setTotalFare] = useState(0);

  const updateTotals = (distance, fare) => {
    setTotalDistance((prev) => prev + distance);
    setTotalFare((prev) => prev + fare);
  };

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const updateCaptainLocation = (location) => {
    setCaptain((prev) => ({ ...prev, location }));
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
    totalDistance,
    totalFare,
    updateTotals,
    updateCaptainLocation,
  };

  useEffect(() => {
    console.log("CaptainContext captain state:", captain);
  }, [captain]);

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
