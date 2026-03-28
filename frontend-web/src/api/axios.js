import axios from "axios";

const api = axios.create({
    baseURL: 'https://regquest-backend.onrender.com/api',
});

api.interceptors.request.use(
    (config) => {
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
            config.headers['Authorization'] = `Bearer ${jwt_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Global 401 Unauthorized handling
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('user');
            window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default api;