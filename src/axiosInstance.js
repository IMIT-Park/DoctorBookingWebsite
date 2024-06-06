import axios from "axios";

const BASIC_URL = "https://doctorbackend.gitdr.com/api";


export const axiosApi = axios.create({
  baseURL: BASIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = "bearer " + token;
  } else {
    console.log("error");
  }
  return config;
});
