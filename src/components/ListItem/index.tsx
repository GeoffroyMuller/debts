import { Component } from "solid-js";
import './ListItem.scss';

interface ListItemProps {
    imgUrl?: string
}
const ListItem: Component<ListItemProps> = (props) => {
    return (
        <div
            class="list-item"
        >
            {
                () => {
                    if (props.imgUrl) {
                        return (
                            <img
                                src={props.imgUrl}
                            />
                        )
                    }
                }
            }
            <div className="list-item__content">
                {props.children}
            </div>
        </div>


    )
}
export default ListItem