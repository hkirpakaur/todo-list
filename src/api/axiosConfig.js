import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://todo-api-zlkh.onrender.com/api',
    withCredentials: true,
    timeout: 10000
})