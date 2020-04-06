import {CHANGE, INVERT, SELECT_CURRENCY} from "./actions";
import { FETCH_DATA_SUCCEEDED } from "../Table/actions";

import { DataAction, Item } from "../interfaces";

export const changeCount = (value: number, currency: Item, rate: number) => ({
    type: CHANGE,
    value,
    currency,
    rate,
} as const);

export const invertCurrencies = () => ({
    type: INVERT,
} as const);

export const selectCurrency = (currency: Item) => ({
    type: SELECT_CURRENCY,
    currency,
} as const);

export const refreshRate = (data: DataAction) => ({
    type: FETCH_DATA_SUCCEEDED,
    data,
} as const);
