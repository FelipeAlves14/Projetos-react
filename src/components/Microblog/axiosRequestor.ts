import axios from "axios";
import { getToken, setToken } from "./usersStore";
import useUsersStore from "./usersStore";

const axiosRequestor: axios.AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});
const { user } = useUsersStore.getState();
axiosRequestor.interceptors.request.use(
  (config) => {
    const token: string | undefined = getToken();
    const data_login: Date = user.ultimo_login // criar um objeto Date a partir da string armazenada no storage
      ? new Date(user.ultimo_login)
      : new Date();
    const data_agora: Date = new Date();
    if (data_agora.getTime() - data_login.getTime() > 18000000) {
      // equivalente a 5 horas
      setToken("");
      config.headers["Authorization"] = "";
    } else if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosRequestor;
