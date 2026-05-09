import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const searchGame = async () => {
    try{
        const res = await api.post('/search')
        return res
    }catch(err){
        console.log(err)
    }
}