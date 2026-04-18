import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

export const cadaster = async (values) => {
    try{
        const res = await axios.post(`${apiUrl}/auth/register`, values, {withCredentials: true});
        return res;
    }catch(error){
        console.log(error)
    }
}