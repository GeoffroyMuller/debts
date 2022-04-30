import axiosInstance from "../plugins/axios"
import { Contact } from "../types/contact.types"

export async function getContacts(): Promise<Contact[]> {
    return (await axiosInstance.get('contacts')).data

    return [
        {
            id: 3,
            firstname: 'zeelle',
            lastname: 'Robert',
            email: 'robert@gmaild.vv',
            operations: [
                {
                    debtor: {
                        id: 3,
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
        },
        {
            id: 2,
            firstname: 'teielle',
            lastname: 'Robert',
            email: 'robert@gmaild.vv',
            operations: [
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
                }
            ]

        },

    ]
}

export async function getContactById(id: number): Promise<Contact> {
    return (await axiosInstance.get(`contacts/${id}`)).data
    return (
        {
            id: 3,
            firstname: 'zeelle',
            lastname: 'Robert',
            email: 'robert@gmaild.vv',
            operations: [
                {
                    debtor: {
                        id: 3,
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
                },
                {
                    creditor: {
                        id: 2,
                        firstname: 'zeelle',
                        lastname: 'Robert',
                        email: 'robert@gmaild.vv'
                    },
                    debtor: {
                        id: 1,
                        firstname: 'michkddita',
                        lastname: 'touille',
                        email: 'geoff@gmaild.vv'
                    },
                    date: '26/01/2022',
                    description: 'Lorem ipsum ...',
                    amount: 560.46
                }
            ]
        }
    )


}
