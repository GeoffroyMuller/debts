import { Link, useMatch } from "solid-app-router";
import { Component, createEffect, createSignal, onMount, Show } from "solid-js";
import { disconnect } from "../../services/auth.services";
import uiStore from "../../stores/ui.store";
import Button from "../Button";
import ClickAwayListener from "../ClickAwayListener";
import Icon from "../Icon";
import './Menu.scss';

interface MenuProps {

}

const Menu: Component<MenuProps> = (props) => {
    const [displayDropDown, setDisplayDropDown] = createSignal(false);
    const [uiStoreValue, setUiStore] = uiStore;
 

    function toggleDisplayDropDown() {
        setDisplayDropDown((d) => !d);
    }

    onMount(() => console.log('mount'))

    return (
        <header class="menu">
            <nav classList={{['justify-items-end']: !uiStoreValue.navBackArrowIsShow}}>
                
                <Show when={uiStoreValue.navBackArrowIsShow}>
                    <Link href={uiStoreValue.navBackArrowPath}>
                        <Icon icon="arrow_back_ios" color="white" size="sm" />
                    </Link>
                </Show>
                <div class="dropdown-menu">
                    <button onClick={toggleDisplayDropDown} >
                        <Icon icon="more_vert" color="white" size="sm" />
                    </button>
                    <Show when={displayDropDown()}>
                        <ClickAwayListener onClickAway={toggleDisplayDropDown}>
                            <div class="dropdown-content">
                                <Link href={`/`}>
                                    <Button variant="text" color="black">
                                        HOME
                                    </Button>
                                </Link>
                                <div className="divider" />
                                <Button variant="text" color="black" onClick={disconnect}>
                                    SE DECONNECTER
                                </Button>

                            </div>
                        </ClickAwayListener>
                    </Show>

                </div>
            </nav>
        </header>
    )
}
export default Menu