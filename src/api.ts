/*
Create instance of axios to calling options
*/
import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

export const api = (props: AxiosRequestConfig) =>
  axiosInstance(props).then((response) => response.data);
