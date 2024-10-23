import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ems-portall-5.onrender.com',
  withCredentials: true,  // This ensures that cookies or authentication tokens are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
