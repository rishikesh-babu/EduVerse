import { Axios } from "axios";

const axiosInstance = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

export default axiosInstance; 