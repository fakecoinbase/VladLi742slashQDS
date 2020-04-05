import { TableState, DataAction, DataFailedAction, Item } from "../interfaces";

import { updateObject } from "../functions";

function fetchDataSucceeded(state: TableState, action: DataAction) {
    const newState: TableState = {
        rows: [],
        isFetched: true,
        error: '',
    };
    if (state.rows.length) {
        newState.rows = updateItemInArray(state.rows, action.data);
    } else {
        newState.rows.push(action.data);
    }
    return updateObject(state, newState);
}

function updateItemInArray(array: Item[], newItem: Item) {
    const arrCopy = [...array];
    const item = array.find((item: Item) => item.text === newItem.text);
    if (item) {
        if (item.value !== newItem.value) {
            item.isIncreased = item.value < newItem.value;
            item.isDecreased = item.value > newItem.value;
            item.value = newItem.value;
        }
    } else arrCopy.push(newItem);
    return arrCopy;
}

function fetchDataFailed(state: TableState, action: DataFailedAction) {
    const newState: TableState = Object.assign({}, state, {
        error: "Произошла ошибка! Пожалуйста, перезагрузите страницу"
    });
    console.error(action.message);
    return updateObject(state, newState);
}

export { fetchDataSucceeded, fetchDataFailed };