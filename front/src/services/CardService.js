import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getCards = async () => {
    const res = await axios.get(`${apiUrl}/cards`);
    return res.data
};