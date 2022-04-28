import { Component, For } from "solid-js";
import './Select.scss';

interface SelectProps {
    onChange?: (value: any) => void,
    label?: string,
    list: Array<any>,
    getOptionLabel: (elem: any) => string,
    getOptionValue: (elem: any) => any,
}

const Select: Component<SelectProps> = (props) => {
    
    if (props.onChange) {
        props.onChange(props.list[0]);
    }

    return (
        <div
            class="select"
        >
            <label>
                {props.label}
            </label>

            <select
                onInput={(event: InputEvent) => {
                    if (props.onChange) {
                        // @ts-ignore
                        const val: string = event.target.value;
                        const data = props.list.find(elem => props.getOptionValue(elem) == val);
                        props.onChange(data);
                    }
                }}

            >
                <For each={props.list} >
                    {(elem) => {
                        return (
                            <option value={props.getOptionValue(elem)}>
                                {props.getOptionLabel(elem)}
                            </option>
                        )
                    }}
                </For>

            </select>


        </div>


    )
}
export default Select