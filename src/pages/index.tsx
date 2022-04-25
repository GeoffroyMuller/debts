import { For } from "solid-js";
import Button from "../components/Button";
import ListItem from "../components/ListItem";
import { getOperations } from "../services/operation.services";
import authStore from "../stores/auth.store";
import { Operation } from "../types/operation.types";
import { createCacheRessource } from "../utils";
import './Home.scss'


const [authstoreValue] = authStore;


export default function Home() {

    const [data] = createCacheRessource<Operation>('operations', getOperations);

    return (
        <div class="home">
            <ListItem>
                <div class="list-item__line">
                    <span>CEDIT</span>
                    <span>250 €</span>
                </div>
                <div class="list-item__line">
                    <span>DETTE</span>
                    <span>250 €</span>
                </div>
            </ListItem>
            {/* @ts-ignore */}
            <For each={data()} fallback={<div>Loading...</div>}>
                {(operation: Operation) => {
                    const userDisplay = operation.debtor.id === authstoreValue.user.id ? operation.creditor : operation.debtor;
                    const isDebt = operation.debtor.id === authstoreValue.user.id;
                    return (
                        <ListItem>
                            <div class="list-item__line">
                                <span class="title text-bold">{userDisplay.firstname} {userDisplay.lastname}</span>
                                <span
                                    class="title"
                                    classList={{
                                        "success-color": !isDebt,
                                        "danger-color": isDebt
                                    }}
                                >
                                    {isDebt ? 'Dette' : 'Credit'} {operation.amount.toFixed(2)} €
                                </span>
                            </div>
                            <div class="list-item__line">
                                <span class="sub-title">{operation.description}</span>
                                <span class="sub-title">{operation.date}</span>
                            </div>
                            <div class="list-item__line list-item__line--end justify-end">
                                <Button variant="text" color="danger">DECLINER</Button>
                                <Button variant="text" color="success">ACCEPTER</Button>
                            </div>
                        </ListItem>
                    )
                }}
            </For>
        </div>
    )
}