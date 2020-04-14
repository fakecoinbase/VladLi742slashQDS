import { FETCH_SUCCESS, fetchSuccess } from "./table";

import { Item, ConverterState } from "../../ts/interfaces";

import { InferValueTypes } from "../../ts/customTypes";

import {
    selectCurrency as select,
    changeCount as change,
    invertCurrencies as invert,
    refreshRate as refresh,
} from '../../utils/converter';

export const SELECT_CURRENCY = "converter-of-currencies/converter/SELECT_CURRENCY";
export const CHANGE = "converter-of-currencies/converter/CHANGE_COUNT_CURRENCIES";
export const INVERT = "converter-of-currencies/converter/INVERT_CURRENCIES";

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

const actions = {
    selectCurrency,
    fetchSuccess,
    changeCount,
    invertCurrencies,
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const initialState: ConverterState = {
    fromCurrency: { text: '', value: 1, onFocus: true },
    inCurrency: { text: '', value: 1, onFocus: false },
    rate: 0,
    selectedCurrency: {},
    isInverted: false,
    isFethed: false,
};

export const reducer = (state= initialState, action: ActionTypes) => {
    switch (action.type) {
        case SELECT_CURRENCY:
            return select(state, action);
        case FETCH_SUCCESS:
            return refresh(state, action);
        case CHANGE:
            return change(state, action);
        case INVERT:
            return invert(state);
        default:
            return state;
    }
};