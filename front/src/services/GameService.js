import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/game',
    withCredentials: true
})

export const searchGame = async () => {
    try{
        const res = await api.post('/matchmaking/search')
        if(res.status == 200 || 201){
            return {
                sucess: true,
                message: res.data.message
            }
        }
        return {
            sucess: false,
            message: res.data.message
        }
    }catch(err){
        return {
            sucess: false,
            message: err.response?.data || "Erro interno no servidor."
        }
    }
}