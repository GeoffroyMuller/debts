import { createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { Operation } from "./types/operation.types";

export function createLocalStore(baseValue = {}, localStorageKey = "") {
    const cacheValue = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey) as string) : undefined;

    let store = createStore(cacheValue || baseValue);
    const [storeValue, setStoreValue] = store;

    if (!cacheValue) {
        localStorage.setItem(localStorageKey, JSON.stringify(baseValue));
    }

    createEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(storeValue));
    })

    return store;
}


let ressourcesCache: any = {};
export function createCacheRessource(key: string, fetcher: () => Promise<Array<Operation>>, options: any = {}) {
    const [data, { mutate, refetch }] = createResource(fetcher, {
        initialValue: ressourcesCache[key]
    });

    createEffect(() => {
        ressourcesCache[key] = data();
    });

    return [data, { mutate, refetch }];

}