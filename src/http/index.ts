import axios, { AxiosRequestConfig } from "axios";

export const BASE_URL = "http://localhost:5000/api/";

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config, "config");

  config.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});

export default $api;
