import { createMemo } from "solid-js"
import axiosInstance from "../plugins/axios"
import authStore from "../stores/auth.store"

export async function login(email: string, password: string) {
    return (await axiosInstance.post('auth/login', {email, password})).data
}

export const isAuth = createMemo(() => {
    return !!authStore[0].user;
})

export async function disconnect() {
    const [auth, setAuth] = authStore;
    setAuth({
        user: undefined,
        token: undefined
    });
}