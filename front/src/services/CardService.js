import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api"
});

export const getCards = async () => {
    const res = await api.get("/cards");
    return res.data
};