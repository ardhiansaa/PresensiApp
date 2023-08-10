import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL, tokenKey } from "../config";

const instance = axios.create({
    baseURL: BASE_URL,
});

const handleRemoveToken = async () => {
    try {
        await AsyncStorage.removeItem(tokenKey);
    } catch (error) {
        throw error;
    }
};

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem(tokenKey);
        if (token && config.headers) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            handleRemoveToken();
        }
        return Promise.reject(error);
    }
);

export default instance;
