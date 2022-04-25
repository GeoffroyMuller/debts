import { Component, createSignal, Show } from "solid-js";
import { disconnect } from "../../services/auth.services";
import Button from "../Button";
import Icon from "../Icon";
import './Menu.scss';

interface MenuProps {

}



const Menu: Component<MenuProps> = (props) => {
    const [displayDropDown, setDisplayDropDown] = createSignal(false);

    function toggleDisplayDropDown() {
        setDisplayDropDown((d) => !d);
    }

    return (
        <header class="menu">
            <nav>
                <div class="dropdown-menu">
                    <button onClick={toggleDisplayDropDown}>
                        <Icon icon="menu" />
                    </button>
                    <Show when={displayDropDown()}>
                        <div class="dropdown-content">
                            <Button variant="text" onClick={disconnect}>
                                SE DECONNECTER
                            </Button>
                        </div>
                    </Show>

                </div>
            </nav>
        </header>
    )
}
export default Menu