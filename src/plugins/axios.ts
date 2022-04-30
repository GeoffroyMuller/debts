import axios from "axios"
import { createEffect } from "solid-js";
import authStore from "../stores/auth.store";


const [authStoreValue, setAuthStoreValue] = authStore

const API_URL = 'http://localhost:3002/'

const axiosInstance = axios.create({
    baseURL: API_URL
});

createEffect(() => {
    axiosInstance.interceptors.request.use(config => {
        if (config.headers)
            config.headers.authorization = authStoreValue.token || '';
        return config;
    }, error => {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 403) {
            setAuthStoreValue({ user: undefined, token: undefined })
        }
        return Promise.reject(error);
    });

})

export default axiosInstance