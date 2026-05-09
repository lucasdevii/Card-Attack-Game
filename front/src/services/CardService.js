import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const getCards = async () => {
  try {
    const res = await api.get(`/cards`);
    return res.data
  } catch (error) {
    console.error("Erro ao buscar cartas:", error);
    throw error;
  }
};