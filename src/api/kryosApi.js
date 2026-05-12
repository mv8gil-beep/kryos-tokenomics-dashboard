import axios from "axios";

const API_BASE_URL = "https://web-production-801ec.up.railway.app";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    
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