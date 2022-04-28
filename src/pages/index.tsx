import { Link } from "solid-app-router";
import { createEffect, createMemo, For, Component, createSignal, onMount } from "solid-js";
import Button from "../components/Button";
import ListItem from "../components/ListItem";
import Modal from "../components/Modal";
import NewTrasactionFormModal from "../components/NewTransactionFormModal";
import Select from "../components/Select";
import Tabs from "../components/Tabs";
import TextField from "../components/TextField";
import Typo from "../components/Typo";
import { getContacts } from "../services/contact.services";
import { getOperations, getTotals, declineOperation, acceptOperation } from "../services/operation.services";
import authStore from "../stores/auth.store";
import uiStore from "../stores/ui.store";
import { Contact } from "../types/contact.types";
import { Operation } from "../types/operation.types";
import { createCacheRessource } from "../utils";
import './Home.scss'


const [authstoreValue] = authStore;

interface ContactWithAmount extends Contact {
    amount: number // negative for debts
}


export default function Home() {

    const [operations, { refetch: refetchOperation }] = createCacheRessource<Operation[]>('operations', getOperations);
    const [contacts, { refetch: refetchContact }] = createCacheRessource<Contact[]>('contacts', getContacts);
    const [totals, { refetch: refetchTotal }] = createCacheRessource('totals', getTotals);
    const [uiStoreValue, setUiStore] = uiStore;

    onMount(() => {
        setUiStore({ navBackArrowIsShow: false })
    })

    const [newTransactionOpen, setNewTransactionOpen] = createSignal(false);

    function refetchAll() {
        refetchOperation()
        refetchContact()
        refetchTotal()
    }

    const contactsWithAmount = createMemo<ContactWithAmount[]>(() => {
        /* @ts-ignore */
        return (contacts() || []).map((c: Contact) => {
            let totalAmount = 0;
            for (const operation of c.operations) {
                const isDebt = operation.debtor.id == authstoreValue.user.id;
                if (isDebt) {
                    totalAmount -= operation.amount
                } else {
                    totalAmount += operation.amount
                }
            }
            return { ...c, amount: totalAmount }
        })
    }, [])

    const contactWhenIAmDebtor = createMemo<ContactWithAmount[]>(() => {
        return contactsWithAmount().filter((c: ContactWithAmount) => c.amount < 0)
    }, [])

    const contactWhenIAmCreditor = createMemo(() => {
        return contactsWithAmount().filter((c: ContactWithAmount) => c.amount > 0)
    }, [])

    return (
        <section class="home">
            <div class="list">
                <ListItem>
                    <div class="list-item__line">
                        <Typo typo="text" color="success">CEDIT</Typo>
                        {/* @ts-ignore */}
                        <Typo typo="text" color="success">{totals()?.credit ? totals()?.credit.toFixed(2) : 0} €</Typo>
                    </div>
                    <div class="list-item__line">
                        <Typo typo="text" color="danger">DETTE</Typo>
                        {/* @ts-ignore */}
                        <Typo typo="text" color="danger">{totals()?.debt ? totals()?.debt.toFixed(2) : 0} €</Typo>
                    </div>
                </ListItem>
                <div class="to-validate-operations-section">
                    <Typo typo="subtitle" color='black'>
                        Opération à valider
                    </Typo>
                    {/* @ts-ignore */}
                    <For each={operations()} fallback={<div>Loading...</div>}>
                        {(operation: Operation) => {
                            const userDisplay = operation.debtor.id === authstoreValue.user.id ? operation.creditor : operation.debtor;
                            const isDebt = operation.debtor.id === authstoreValue.user.id;
                            return (
                                <ListItem>
                                    <div class="list-item__line">
                                        <Typo typo="text">
                                            {userDisplay.firstname} {userDisplay.lastname}
                                        </Typo>

                                        <Typo typo="text" color={!isDebt ? 'success' : 'danger'}>
                                            {isDebt ? 'Dette' : 'Credit'} {operation.amount.toFixed(2)} €
                                        </Typo>

                                    </div>
                                    <div class="list-item__line">
                                        <Typo typo="text2">
                                            {operation.description || ''}
                                        </Typo>
                                        <Typo typo="text2">
                                            {operation.date || ''}
                                        </Typo>

                                    </div>
                                    <div class="list-item__line list-item__line--end justify-end">
                                        <Button onClick={async () => {
                                            await declineOperation(operation)
                                            refetchAll()
                                        }} variant="text" color="danger">DECLINER</Button>
                                        <Button onClick={async () => {
                                            await acceptOperation(operation)
                                            refetchAll()
                                        }} variant="text" color="success">ACCEPTER</Button>
                                    </div>
                                </ListItem>
                            )
                        }}
                    </For>
                </div>


            </div>
            <div class="contact-tabs">
                <Typo typo="subtitle" color='black'>
                    Contact
                </Typo>
                <Tabs tabs={[
                    {
                        title: 'Tout',
                        content: <ContactList list={contactsWithAmount()} />
                    },
                    {
                        title: 'Credit',
                        content: <ContactList list={contactWhenIAmCreditor()} />
                    },
                    {
                        title: 'Dette',
                        content: <ContactList list={contactWhenIAmDebtor()} />
                    }
                ]} />
            </div>

            <footer>
                <Button fullWidth onClick={() => setNewTransactionOpen(true)}>
                    Créer une transaction
                </Button>
                <NewTrasactionFormModal
                    open={newTransactionOpen()}
                    onClose={() => setNewTransactionOpen(false)}
                    contactList={contactsWithAmount()}
                />
            </footer>

        </section>
    )
}

interface ContactListProps {
    list: Array<ContactWithAmount>
}
const ContactList: Component<ContactListProps> = (props) => {
    function handleGoContact(contact: Contact) {

    }
    return (
        <div class="list">
            <For each={props.list} fallback={<div>Aucun contact ici</div>}>
                {(contact) => {
                    return (
                        <Link href={`/contacts/${contact.id}`}>
                            <ListItem onClick={() => handleGoContact(contact)}>
                                <div class="list-item__line">
                                    <Typo typo="text">
                                        {contact.firstname} {contact.lastname}
                                    </Typo>
                                    <Typo typo="text" color={contact.amount > 0 ? 'success' : 'danger'}>
                                        {contact.amount > 0 ? 'Credit' : 'Dette'} {Math.abs(contact.amount).toFixed(2)} €
                                    </Typo>
                                </div>
                            </ListItem>
                        </Link>
                    )
                }}
            </For>
        </div>
    )
}