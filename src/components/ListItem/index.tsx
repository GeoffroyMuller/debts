import { Component } from "solid-js";
import './ListItem.scss';

interface ListItemProps {
    imgUrl?: string
    onClick?: (event: Event) => void
}
const ListItem: Component<ListItemProps> = (props) => {
    return (
        <div
            class="list-item"
            onClick={props.onClick}
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
            <div class="list-item__content" classList={{
                'with-img': !!props.imgUrl
            }}>
                {props.children}
            </div>
        </div>


    )
}
export default ListItem