import { Component, createSignal, For, JSXElement } from "solid-js";
import Typo from "../Typo";
import "./Tabs.scss";


interface Tab {
    title: string;
    content: JSXElement;
}

interface TabsProps {
    tabs: Tab[];
}



const Tabs: Component<TabsProps> = (props) => {
    const [selectedTab, setSelectedTab] = createSignal<Tab>(props.tabs[0]);

    return (
        <>
            <div class="tabs">
                <div class="tabs-head">
                    <For each={props.tabs}>
                        {tab => (
                            <button
                                class="tab"
                                classList={{
                                    'tab-active': selectedTab().title == tab.title
                                }}
                                onClick={() => setSelectedTab(tab)}
                            >
                                <Typo typo="text" color={selectedTab().title == tab.title ? 'white' : 'black'} >
                                    {tab.title}
                                </Typo>
                            </button>
                        )}
                    </For>
                </div>
                <div class="tabs-content">
                    {selectedTab().content}
                </div>
            </div>
        </>
    )
}
export default Tabs