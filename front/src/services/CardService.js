import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getCards = async () => {
  try {
    const res = await axios.get(`${apiUrl}/cards`);
    return res.data
  } catch (error) {
    console.error("Erro ao buscar cartas:", error);
    throw error;
  }
};