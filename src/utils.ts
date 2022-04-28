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
        console.log(storeValue)

        localStorage.setItem(localStorageKey, JSON.stringify(storeValue));
    })

    return store;
}


export function createCacheRessource<T>(key: string, fetcher: () => Promise<T | Array<T>>, options: any = {}) {

    let ressourcesCache: any = {};
    const ressource = createResource(fetcher, {
        initialValue: ressourcesCache[key]
    });

    createEffect(() => {
        ressourcesCache[key] = ressource[0]();
    });

    return ressource;

}