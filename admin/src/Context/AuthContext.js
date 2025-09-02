import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../Utility/API.js";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState({});
  const [config, setConfig] = useState({});
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) return; // skip if not logged in

    const fetchUser = async () => {
      try {
        const { data } = await axios.get("https://company-website-beta-six.vercel.app/api/auth/private", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        setActiveUser(data.user);

        // Save headers for future requests
        setConfig({
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Auth check failed:", error.response?.data || error);
        localStorage.removeItem("authToken");
        setActiveUser({});
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
