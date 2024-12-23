import axios from "axios";

export const axiosRequestor = axios.create({
    baseURL: "https://hp-api.onrender.com/api/"
});