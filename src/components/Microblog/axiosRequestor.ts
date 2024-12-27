import axios from "axios";
import { getToken } from "./usersStore";

const axiosRequestor: axios.AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

axiosRequestor.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosRequestor;
