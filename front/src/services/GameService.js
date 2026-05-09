import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.url.,
  withCredentials: true
});

export const searchGame = async () => {
    await axios.post('', {}, {withCredentials: true}).then(
        (res) => {
            return res
        }
    )
    .catch(
        (err) => {
            console.log(err)
        }
    )
}