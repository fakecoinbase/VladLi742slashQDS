import { FETCH_DATA, FETCH_DATA_SUCCEEDED, FETCH_DATA_FAILED } from "./actions";

import { Item } from "../interfaces";

export const fetchData = () => ({
    type: FETCH_DATA,
} as const);

export const fetchDataSucceeded = (data: Item) => ({
    type: FETCH_DATA_SUCCEEDED,
    data,
} as const);

export const fetchDataFailed = (message: string) => ({
    type: FETCH_DATA_FAILED,
    message,
} as const);
