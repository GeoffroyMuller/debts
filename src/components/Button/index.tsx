import { Component } from "solid-js";
import { Color } from "../types";
import './Button.scss';

interface ButtonProps {
    onClick?: (event: Event) => void,
    variant?: 'outlined' | 'text' | 'default',
    color?: Color;
    fullWidth?: boolean;
}

const Button: Component<ButtonProps> = (props) => {
    return (
        <button
            onClick={props.onClick}
            class='btn'
            classList={{ 
                ['full-width']: props.fullWidth,
                [(props.variant || 'default') + 'Btn']: true,
                [(props.color || 'primary') + 'Color']: true
            }}
        >
            {props.children}
        </button >
    )
}
export default Button