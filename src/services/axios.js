import axios from "axios";
import { toast } from "react-hot-toast";

const enviroment = "development"; // change to production when deploying

const development = "https://crgapi.aaagroup.com/HirerProfileApi/";
const production = "https://";

const axiosInstance = axios.create({
    baseURL: enviroment === "development" ? development : production,
    withCredentials: true,
});

const getToken = () => {
    return JSON.parse(localStorage.getItem("accessToken"));
};

const getHeaders = (url = '') => {
    if (url === '/api/admin/auth/registerAdmin') {
        return {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

    const token = getToken();
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
};

const uploadHeaders = (url = '') => {
    const token = getToken();
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
};

const sessionExpired = () => {
    alert('Session expired. Please log in again.');
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url === '/api/auth/register') {
            if (!error.response) {
                return Promise.reject(new Error("The server is not responding. Please try again later."));
            }
            return Promise.reject(error);
        }

        // make sure the status code is not 401 and url isn't the login or logout url
        if (error.response.status !== 401 || originalRequest.url === '/api/auth/login' || originalRequest.url === '/api/auth/logout') {
            if (error.response.status === 403) {
                const errorMessage = error.response.data?.message || 'Access denied';
                toast.error(errorMessage);
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post(`${enviroment === "development" ? development : production}/api/admin/auth/refreshToken`, {}, { withCredentials: true });
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                sessionExpired();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
export { uploadHeaders, getHeaders, getToken };