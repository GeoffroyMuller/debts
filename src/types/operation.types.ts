export interface Operation {
    id?: number;
    debtor?: any;
    creditor?: any;
    description: string;
    date?: string;
    amount: number;

    debtorId?: number
    creditorId?: number
}