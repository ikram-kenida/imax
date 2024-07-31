import axios from "axios";
import i18n from "./i18n";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": i18n.language,
    Currency: "usd",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

export default axiosClient;
