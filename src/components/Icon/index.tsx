import { Component } from "solid-js";
import { Color, Size } from "../types";
import "./Icon.scss";


interface IconProps {
    icon: string;
    size?: Size;
    color?: Color;
}



const Icon: Component<IconProps> = (props) => {
    return (
        <span class={`material-icons icon icon-${props.size || 'md'} ${props.color || 'black'}Color`}>
            {props.icon}
        </span>
    )
}
export default Icon