import { Item, TableState } from "../../ts/interfaces";
import { InferValueTypes } from "../../ts/customTypes";

import { fetchDataSucceeded, fetchDataFailed } from "../../utils/table";
import { updateObject } from "../../utils/functions";

export const FETCH_DATA = 'converter-of-currencies/table/FETCH_DATA';
export const FETCH_SUCCESS = 'converter-of-currencies/table/FETCH_SUCCESS';
export const FETCH_FAIL = 'converter-of-currencies/table/FETCH_FAIL';

export const fetchData = () => ({
    type: FETCH_DATA,
} as const);

export const fetchSuccess = (data: Item) => ({
    type: FETCH_SUCCESS,
    data,
} as const);

export const fetchFail = (message: string) => ({
    type: FETCH_FAIL,
    message,
} as const);

const initialState: TableState = {
    rows: [],
    error: '',
    isFetched: false,
};

const actions = { fetchData, fetchSuccess, fetchFail };

type Action = ReturnType<InferValueTypes<typeof actions>>;

export const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCH_DATA:
            return updateObject(state, action);
        case FETCH_SUCCESS:
            return fetchDataSucceeded(state, action);
        case FETCH_FAIL:
            return fetchDataFailed(state, action);
        default:
            return state;
    }
};