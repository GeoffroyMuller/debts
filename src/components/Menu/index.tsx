import { Link } from "solid-app-router";
import { Component, createSignal, Show } from "solid-js";
import { disconnect } from "../../services/auth.services";
import Button from "../Button";
import ClickAwayListener from "../ClickAwayListener";
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
                        <Icon icon="more_vert" color="white" />
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