import axios from "axios";
import { GetToken } from "../utils/GetToken";

const token = GetToken();

export const api = axios.create({
  baseURL: "https://localhost:7052",
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
    Authorization: `bearer ${token}`,
  },
});