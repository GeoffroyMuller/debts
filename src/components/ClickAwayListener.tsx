import { Component, createSignal, onCleanup, onMount, Show } from "solid-js";


interface ClickAwayListenerProps {
    onClickAway: () => void;
}


// todo :  ne fonctionne pas parfaitement ...
const ClickAwayListener: Component<ClickAwayListenerProps> = (props) => {
    let eventListener;

    const handleClickBody = () => {
        console.log('onClickAway')
        props.onClickAway();
    };

    onMount(() => {
        eventListener = document.body.onclick = handleClickBody;
    })

    onCleanup(() => {
        document.body.onclick = () => {}
    })

    return (
        <div onClick={(event) => event.stopPropagation()}>
            {props.children}
        </div>
    )
}
export default ClickAwayListener