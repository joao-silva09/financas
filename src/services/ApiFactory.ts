import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthClient, ContaClient } from "./api";

export default class ApiFactory {
  private static handleRequest = (config: AxiosRequestConfig) => {
    // const token = localStorage.getItem("accessToken");
    const token =
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzIiwibmFtZSI6ImpvYW8iLCJuYmYiOjE2Njc5NTMzOTksImV4cCI6MTY2ODAzOTc5OSwiaWF0IjoxNjY3OTUzMzk5fQ.LxsNgL7LmnXcMekkQanpi7AAmvAPYfvPGMTJullQFvsl67G41i2bUT2fxFmOT9AZPwhszmV8HiVat13p60v8ew";
    config.headers!.Authorization = `bearer ${token}`;
    console.log(config.headers);
    return config;
  };

  private static handleRequestError = (config: AxiosRequestConfig) => {
    console.log(config.headers);
    return config;
  };

  private static handleResponse = (config: AxiosResponse) => {
    console.info(config.headers);
    return config;
  };

  public static GetAuthClient(): AuthClient {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    );
    axiosInstance.interceptors.response.use(this.handleResponse);
    const client = new AuthClient("https://localhost:7052", axiosInstance);
    return client;
  }

  public static GetContaClient(): ContaClient {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    );
    axiosInstance.interceptors.response.use(this.handleResponse);
    const client = new ContaClient("https://localhost:7052", axiosInstance);
    return client;
  }
}
