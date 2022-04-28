import { useParams } from "solid-app-router";
import { Component, For, Show, createSignal, createMemo } from "solid-js";
import Button from "../../components/Button";
import ListItem from "../../components/ListItem";
import NewTrasactionFormModal from "../../components/NewTransactionFormModal";
import Select from "../../components/Select";
import Typo from "../../components/Typo";
import { getContactById, getContacts } from "../../services/contact.services";
import authStore from "../../stores/auth.store";
import { Contact } from "../../types/contact.types";
import { Operation } from "../../types/operation.types";
import { createCacheRessource } from "../../utils";
import './ContactPage.scss';


const [authstoreValue] = authStore;

interface ContactPageProps {

}

interface Total {
    debt: number;
    credit: number;
}

const ContactPage: Component<ContactPageProps> = (props) => {
    const params = useParams();
    const [contact, { refetch: refetchContact }] = createCacheRessource<Contact>(`contact-${params.id}`, () => getContactById(params.id as unknown as number));
    const [contacts, { refetch: refetchContacts }] = createCacheRessource<Contact[]>('contacts', getContacts);
    const [newTransactionOpen, setNewTransactionOpen] = createSignal(false);

    const [showDebtType, setShowDebtType] = createSignal<'debts' | 'credits' | 'all'>();

    const operationsDisplayed = createMemo(() => {
        if (contact()?.operations) {
            switch (showDebtType()) {
                case "credits":
                    return contact().operations.filter((operation: Operation) => operation.debtor.id !== authstoreValue.user.id);
                case "debts":
                    return contact().operations.filter((operation: Operation) => operation.debtor.id === authstoreValue.user.id);
                case 'all':
                    return contact().operations;
                default:
                    return []
            }
        }

    }, []);

    const contactTotals = createMemo<Total>(() => {
        let debt = 0
        let credit = 0
        let operations: Operation[] = contact()?.operations || []

        for (let i = 0; i < operations.length; i++) {
            const isDebt = operations[i].debtor.id == authstoreValue.user.id;
            if (isDebt) {
                debt = debt + operations[i].amount
            }
            if (!isDebt) {
                credit = credit + operations[i].amount
            }
        }

        return { debt, credit }
    })

    return (
        <div class="contact-page" >
            <Show when={contact()}>
                <Typo typo="subtitle">
                    Historique {contact().firstname} {contact().lastname}
                </Typo>
            </Show>
            <div class="list-items">
                <ListItem>
                    <div class="list-item__line">
                        <Typo typo="text" color="success">CEDIT</Typo>
                        {/* @ts-ignore */}
                        <Typo typo="text" color="success">{contactTotals().credit} €</Typo>
                    </div>
                    <div class="list-item__line">
                        <Typo typo="text" color="danger">DETTE</Typo>
                        {/* @ts-ignore */}
                        <Typo typo="text" color="danger">{contactTotals().debt} €</Typo>
                    </div>
                    <div class="list-item__line">
                        <Typo typo="text" color="black">TOTAL</Typo>
                        {/* @ts-ignore */}
                        <Typo typo="text" color="black">{(contactTotals().credit - contactTotals().debt).toFixed(2)} €</Typo>
                    </div>
                </ListItem>
            </div>
            <Select
                label="Débit/Crédit"
                list={[
                    { label: 'Tout', id: 'all' },
                    { label: 'Débit', id: 'debts' },
                    { label: 'Crédit', id: 'credits' }
                ]}
                getOptionLabel={(elem: { label: string; id: string; }) => elem.label}
                getOptionValue={(elem: { label: string; id: string; }) => elem.id}
                onChange={(val: { label: string; id: string; }) => {
                    setShowDebtType(val.id as 'debts' | 'credits' | 'all')
                }}

            />
            <div class="list-items">

                <For each={operationsDisplayed()} fallback={<div>Aucune opération</div>}>
                    {(operation: Operation) => {
                        const isDebt = operation.debtor.id === authstoreValue.user.id;
                        return (
                            <ListItem>
                                <div class="list-item__line">
                                    <Typo typo="text" color={!isDebt ? 'success' : 'danger'}>
                                        {!isDebt ? 'CREDIT' : 'DEBIT'}
                                    </Typo>
                                    <Typo typo="text" color={!isDebt ? 'success' : 'danger'}>
                                        {Math.abs(operation.amount).toFixed(2)} €
                                    </Typo>

                                </div>
                                <div class="list-item__line">
                                    <Typo typo="text2">
                                        {operation.description}
                                    </Typo>
                                    <Typo typo="text2" >
                                        {operation.date}
                                    </Typo>
                                </div>
                            </ListItem>
                        )
                    }}
                </For>
            </div>
            <footer>
                <Button fullWidth onClick={() => setNewTransactionOpen(true)}>
                    Créer une transaction
                </Button>
                <NewTrasactionFormModal
                    open={newTransactionOpen()}
                    onClose={() => setNewTransactionOpen(false)}
                    contactList={contacts() || []}
                />
            </footer>

        </div>


    )
}
export default ContactPage
