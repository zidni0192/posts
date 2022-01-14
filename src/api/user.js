import axios from "axios"
import { API_HOST } from "../constant/hosts"

const login = async (userId, email, isAdmin) => {
    const { data } = await axios.get(`${API_HOST}/users/${userId}`)
    if (data?.email === email) {
        return { ...data, isAdmin }
    } else {
        return false
    }
}

export default { login }