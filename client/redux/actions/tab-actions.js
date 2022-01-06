import {
    TAB_OPENED,
    TAB_CLOSED
} from "../constants";


export function openTab(tab, props) {
    return {type: TAB_OPENED, payload: {tab, props}}
}

export function closeTab(tab) {
    return {type: TAB_CLOSED, payload: {tab}}
}