import { Component, createEffect, createSignal, Show } from "solid-js"
import { addOperation } from "../../services/operation.services"
import authStore from "../../stores/auth.store"
import { Contact } from "../../types/contact.types"
import Button from "../Button"
import Modal, { ModalProps } from "../Modal"
import Select from "../Select"
import TextField from "../TextField"
import Typo from "../Typo"

import './NewTrasactionFormModal.scss'


const [authstoreValue] = authStore;

interface NewTrasactionFormModalProps extends ModalProps {
    contactList: Array<Contact> // Contact[]
}

const NewTrasactionFormModal: Component<NewTrasactionFormModalProps> = (props) => {
    const [selectedPersonne, setSelectedPersonne] = createSignal<Contact>(props.contactList[0]);
    const [amount, setAmount] = createSignal<number>(0);
    const [description, setDescription] = createSignal<string>("");
    const [isDebt, setIsDebt] = createSignal(false);

    function cancel() {
        if (props.onClose) {
            props.onClose();
        }
    }

    async function handleSave() {
        try {

            const newOperation = {
                amount: amount(),
                creditorId: !isDebt() ? authstoreValue.user?.id : selectedPersonne()?.id,
                debtorId: isDebt() ? authstoreValue.user?.id : selectedPersonne()?.id,
                description: description()
            };
            await addOperation(newOperation);
            console.log({ newOperation });
            if (props.onClose) {
                props.onClose();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Modal open={props.open} onClose={props.onClose}>
                <div class="transaction-modal-content">
                    <Typo typo="title">
                        Nouvelle Transaction
                    </Typo>
                    <div class="transaction-modal-content-fields">
                        <Select
                            label="Personne"
                            list={props.contactList}
                            getOptionLabel={(elem: Contact) => `${elem.firstname} ${elem.lastname}`}
                            getOptionValue={(elem: Contact) => elem.id}
                            onChange={(val) => {
                                setSelectedPersonne(val)
                            }}

                        />
                        <TextField type="number" label="Somme" onChange={(val) => setAmount(val as unknown as number)} />
                        <div class="transaction-modal-content-fields-radio-buttons">
                            <div>
                                <input type="radio" id="send" name="isdebt" onClick={() => setIsDebt(false)} />
                                <label for="send">
                                    J’envoie de l’argent <Show when={selectedPersonne()}>à {selectedPersonne()?.firstname}</Show>
                                </label>
                            </div>
                            <div>
                                <input type="radio" id="reveive" name="isdebt" onChange={() => setIsDebt(true)} />
                                <label for="reveive">
                                    <Show when={selectedPersonne()} fallback={<>Je recois de l’argent</>}>
                                        {selectedPersonne()?.firstname || ''} m’envoie de l’argent
                                    </Show>

                                </label>
                            </div>
                        </div>

                        <TextField label="Description" multiline onChange={(val) => setDescription(val)} />
                    </div>

                    <div class="active-footer">
                        <Button
                            variant="text"
                            color="danger"
                            onClick={cancel}
                        >
                            ANNULER
                        </Button>
                        <Button
                            variant="text"
                            color="success"
                            onClick={handleSave}
                        >
                            ENVOYER
                        </Button>

                    </div>
                </div>
            </Modal>
        </>
    )
}

export default NewTrasactionFormModal;