import axios from "axios"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/auth',
    withCredentials: true
})

export const cadaster = async (values) => {
    try {
        const res = await api.post(`/register`, values);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data ?? error);
        throw error;
    }
}

export const login = async (values) => {
    try {
        const res = await api.post(`/login`, values);
        return res.data;
    } catch (error) {
        console.log(error?.response?.data ?? error);
        throw error;
    }
}