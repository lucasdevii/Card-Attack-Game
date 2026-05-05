import axios from "axios"

export let user = null;
export let isAuth = false;
export let error = "";

export const getUserInfos = async () => {
    user = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true })
    .then(res => {
        console.log(res.data)
        if(res.status == 200){
            isAuth = true;
            return res.data.user;
        }
        return null
    }).catch(err => {
        error = err;
        console.log(error);
        return null;
    })
}