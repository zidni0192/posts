import axios from "axios"
import { API_HOST } from "../constant/hosts"

const getPosts = async (page = 1, limit = 5) => {
    const { data } = await axios.get(`${API_HOST}/posts?_page=${page}&_limit=${limit}`)
    if (data) {
        return data
    } else {
        return false
    }
}

const getComments = async (postId) => {
    const { data } = await axios.get(`${API_HOST}/comments?postId=${postId}`)
    if (data) {
        return data
    } else {
        return false
    }
}

const post = { getPosts, getComments }
export default post