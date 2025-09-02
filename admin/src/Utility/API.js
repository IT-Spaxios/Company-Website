import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // comes from .env
  withCredentials: true, // optional if your backend uses cookies
});

export default API;
