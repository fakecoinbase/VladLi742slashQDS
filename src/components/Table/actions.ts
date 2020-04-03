import { Item } from "../../interfaces";

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCEEDED = 'FETCH_DATA_SUCCEEDED';
export const DATA_FETCH_FAILED = 'DATA_FETCH_FAILED';

export const fetchData = () => ({
    type: FETCH_DATA,
});

export interface DataAction {
    readonly data: Item,
}

