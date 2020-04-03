import { updateObject } from "../../functions";
import { TableState, Item } from "../../interfaces";
import { DataAction } from "./actions";

interface NewState {
    isLoaded: boolean,
    rows: Item[],
}

function fetchDataSucceeded(state: TableState, action: DataAction) {
    const newState: NewState = {
        rows: [],
        isLoaded: true,
    };
    if (!state.rows.length) {
        newState.rows.push(action.data);
    } else {
        newState.rows = updateItemInArray(state.rows, action.data);
    }
    return updateObject(state, newState);
}

function updateItemInArray(array: Item[], newItem: Item) {
    const arrCopy = [...array];
    const item = array.find((item: Item) => item.text === newItem.text);
    if (item) {
        if (item.value !== newItem.value) {
            item.value = newItem.value;
        }
    } else arrCopy.push(newItem);
    return arrCopy;
}

export { fetchDataSucceeded };