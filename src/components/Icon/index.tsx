import { Component } from "solid-js";
import "./Icon.scss";

type Size = 'xs' | 'sm' | 'md' | 'lg'
interface IconProps {
    icon: string;
    size?: Size
}



const Icon: Component<IconProps> = (props) => {
    return (
        <span class={`material-icons  icon-${props.size || 'md'}`}>
            {props.icon}
        </span>
    )
}
export default Icon