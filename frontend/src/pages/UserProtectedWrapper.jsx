import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyIsUserLoggingIn = async () => {
      if (!token) {
        navigate("/login");
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          console.log("USER PROTECTED WRAPPER", data);
          setUser(data);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    verifyIsUserLoggingIn();
  }, [token, navigate, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
