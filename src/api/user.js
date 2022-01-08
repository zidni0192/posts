import axios from "axios"
import { API_HOST } from "../constant/hosts"

const login = async (userId, email, isAdmin) => {
    const { data } = await axios.get(`${API_HOST}/users/${userId}`)
    console.log(data);
    if (data?.email === email) {
        const user = JSON.stringify({ ...data, isAdmin })
        return user
    } else {
        return false
    }
}

export default { login }