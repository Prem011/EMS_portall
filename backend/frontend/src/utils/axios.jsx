import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4001',
  withCredentials: true,  // This ensures that cookies or authentication tokens are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
