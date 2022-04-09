import { Component } from "solid-js";
import './TextField.scss';

interface TextFieldProps {
    onChange?: (value: string) => void,
    type?: string,
    label?: string
}
const TextField: Component<TextFieldProps> = (props) => {
    return (
        <div
            class="textfield"
        >
            <label>
                {props.label}
            </label>
            <input
                onInput={(event: InputEvent) => {
                    if (props.onChange) {
                        // @ts-ignore
                        props.onChange(event.target.value)
                    }
                }}
                type={props.type || 'text'}
            />
        </div>


    )
}
export default TextField