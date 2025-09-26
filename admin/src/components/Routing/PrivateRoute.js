import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Home from "../GeneralScreens/Home";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import API from "../../Utility/API.js";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { activeUser, setActiveUser, setConfig } = useContext(AuthContext);
  const [auth, setAuth] = useState(!!localStorage.getItem("authToken"));
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setAuth(false);
        setActiveUser({});
        navigate("/");
        return;
      }

      try {
        const { data } = await API.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/private`, {
          headers: { authorization: `Bearer ${token}` },
        });

        setAuth(true);
        setActiveUser(data.user);

        setConfig({
          headers: { authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("PrivateRoute auth failed:", err.response?.data || err);
        localStorage.removeItem("authToken");
        setAuth(false);
        setActiveUser({});
        setError("You are not authorized. Please login.");
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate, setActiveUser, setConfig]);

  return auth ? <Outlet /> : <Home error={error} />;
};

export default PrivateRoute;
