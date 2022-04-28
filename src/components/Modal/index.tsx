import { Component, createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import './Modal.scss';

export interface ModalProps {
    open: boolean;
    onClose?: () => void;
}



const Modal: Component<ModalProps> = (props) => {
    function handleClose() {
        if (props.onClose) {
            props.onClose();
        }
    }

    return (
        <Portal>
            <Show when={props.open}>
                <div class="modal-background" onClick={handleClose} />
                <div class="modal">
                    {props.children}
                </div>
            </Show>
        </Portal>
    )
}
export default Modal