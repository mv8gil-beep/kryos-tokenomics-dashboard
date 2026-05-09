import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8001/kryos/v1";
const API_KEY = "put-a-long-random-string-here";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  },
});

export const checkHealth = async () => {
  const res = await api.get("/health");
  return res.data;
};

export const compareAll = async (payload) => {
  const res = await api.post("/compare_all", payload);
  return res.data;
};

export const optimize = async (payload) => {
  const res = await api.post("/optimize", payload);
  return res.data;
};