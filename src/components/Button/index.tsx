import { Component } from "solid-js";
import './Button.scss';

interface ButtonProps {
    onClick?: (event: Event) => void,
    variant?: 'outlined' | 'text' | 'default',
    color?: 'success' | 'danger' | 'warning' | 'info' | 'primary'
}

const Button: Component<ButtonProps> = (props) => {
    return (
        <button
            onClick={props.onClick}
            class='btn'
            classList={{ 
                [(props.variant || 'default') + 'Btn']: true,
                [(props.color || 'primary') + 'Color']: true
            }}
        >
            {props.children}
        </button >
    )
}
export default Button