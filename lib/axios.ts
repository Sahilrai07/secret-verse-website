
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // Default: same origin
  withCredentials: true, // If you're using cookies for auth
});

export default axiosInstance;
