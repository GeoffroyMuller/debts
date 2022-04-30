import { createMemo } from "solid-js"
import axiosInstance from "../plugins/axios";
import authStore from "../stores/auth.store"
import { Operation } from "../types/operation.types"

interface Total {
    debt: number;
    credit: number;
}


export async function getTotals(): Promise<Total> {
    return (await axiosInstance.get('operations/totals'))?.data
}

export async function addOperation(operation: Operation): Promise<Operation> {
    return (await axiosInstance.post('operations', operation))?.data
}

export async function declineOperation(operation: Operation): Promise<Operation> {
    return operation
}

export async function acceptOperation(operation: Operation): Promise<Operation> {
    return operation
}

export async function getOperations(): Promise<Operation[]> {
    return (await axiosInstance.get('operations'))?.data

}
