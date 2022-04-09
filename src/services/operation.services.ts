import { createMemo } from "solid-js"
import authStore from "../stores/auth.store"

export async function getOperations(){
    return [
        {
            debtor: {
                id: 1,
                firstname: 'michkita',
                lastname: 'touille',
                email: 'geoff@gmaild.vv'
            },
            creditor: {
                id: 2,
                firstname: 'teielle',
                lastname: 'Robert',
                email: 'robert@gmaild.vv'
            },
            description: 'Lorem ipsum ...',
            date: '26/01/2022',
            amount: 10.00
        },
        {
            debtor: {
                id: 2,
                firstname: 'zeelle',
                lastname: 'Robert',
                email: 'robert@gmaild.vv'
            },
            creditor:{
                id: 1,
                firstname: 'michkddita',
                lastname: 'touille',
                email: 'geoff@gmaild.vv'
            } ,
            date: '26/01/2022',
            description: 'Lorem ipsum ...',
            amount: 100.54
        }
    ]
}
 