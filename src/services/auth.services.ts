import { createMemo } from "solid-js"
import authStore from "../stores/auth.store"

export async function login(email : string, password : string){
    return {
        user: {
            id: 1,
            firstname: 'michkita',
            lastname: 'touille',
            email: 'geoff@gmaild.vv'
        },
        token: "uahefoa"
    }
}

export const isAuth = createMemo(() => {
    return !!authStore[0].user;
}) 