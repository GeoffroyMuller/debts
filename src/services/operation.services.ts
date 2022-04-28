import { createMemo } from "solid-js"
import authStore from "../stores/auth.store"
import { Operation } from "../types/operation.types"

interface Total {
    debt: number;
    credit: number;
}


export async function getTotals(): Promise<Total> {
    return {
        debt: 10,
        credit: 100.54
    }
}

export async function addOperation(operation: Operation): Promise<Operation> {
    return { ...operation, id: Math.random() }
}

export async function declineOperation(operation: Operation): Promise<Operation> {
    return operation
}

export async function acceptOperation(operation: Operation): Promise<Operation> {
    return operation
}

export async function getOperations(): Promise<Operation[]> {
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
            creditor: {
                id: 1,
                firstname: 'michkddita',
                lastname: 'touille',
                email: 'geoff@gmaild.vv'
            },
            date: '26/01/2022',
            description: 'Lorem ipsum ...',
            amount: 100.54
        }
    ]
}
