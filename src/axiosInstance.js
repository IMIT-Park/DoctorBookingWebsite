import axios from "axios";

// dashboard url
export const dashboardUrl = "https://mydoctorsdashboard.gitdr.com/";

// image base url
export const imageBase_URL =
  "https://aeda-2405-201-f018-10d6-605d-8aa4-161b-1443.ngrok-free.app/";

// const BASIC_URL = "https://doctorbackend.gitdr.com/api";
const BASIC_URL =
  "https://aeda-2405-201-f018-10d6-605d-8aa4-161b-1443.ngrok-free.app/api";

export const axiosApi = axios.create({
  baseURL: BASIC_URL,
  headers: {
    "Content-Type": "application/json",
    'ngrok-skip-browser-warning': 'true'
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
