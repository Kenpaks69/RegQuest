import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStoredUser = async () => {
            try {
                const token = await AsyncStorage.getItem('jwt_token');
                const storedUser = await AsyncStorage.getItem('user');

                if (token && storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Failed to restore native session", error);
                await logout();
            } finally {
                setIsLoading(false);
            }
        };

        loadStoredUser();
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        
        const { jwt_token, user: userData } = response.data;
        await AsyncStorage.setItem('jwt_token', jwt_token);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        router.replace('/(tabs)/home');
    };

    const logout = async () => {
        await AsyncStorage.removeItem('jwt_token');
        await AsyncStorage.removeItem('user');
        setUser(null);
        router.replace('/auth/login');
    };

    const value = {
        user,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
