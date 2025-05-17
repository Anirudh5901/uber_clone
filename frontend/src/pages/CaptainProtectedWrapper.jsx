import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyIsCaptainLoggingIn = async () => {
      if (!token) {
        navigate("/captain-login");
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          setCaptain(data.captain);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setLoading(false);
      }
    };
    verifyIsCaptainLoggingIn();
  }, [token, navigate, setCaptain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
