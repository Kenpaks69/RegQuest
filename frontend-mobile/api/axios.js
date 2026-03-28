import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Environment variable lookup with a fallback to the Live deployed API endpoint
const baseURL = process.env.EXPO_PUBLIC_API_URL || 'https://regquest-backend.onrender.com/api';

const api = axios.create({
    baseURL,
});

api.interceptors.request.use(
    async (config) => {
        const jwt_token = await AsyncStorage.getItem("jwt_token");
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
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Global 401 Unauthorized handling cleanly resets session state
            await AsyncStorage.removeItem('jwt_token');
            await AsyncStorage.removeItem('user');
            
            if (router.replace) {
                router.replace('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
