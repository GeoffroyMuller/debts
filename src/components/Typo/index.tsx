import { Component, createSignal, Show } from "solid-js";
import { Color } from "../types";
import './Typo.scss';

interface TypoProps {
    class?: string;
    typo?: "text" | "text2" | "subtitle" | "title";
    color?: Color;
}



const Typo: Component<TypoProps> = (props) => {
    return (
        <span class={`typo typo-${props.typo || 'text'} ${(props.color || 'primary')}Color ${props.class || ''}`}>
            {props.children}
        </span>
    )
}
export default Typo