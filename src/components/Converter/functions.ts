import { divide, round, cloneDeep } from 'lodash';

import { updateObject } from "../../functions";
import { ConverterState, Currency } from "../../interfaces";
import { DataAction } from "../Table/actions";

function refreshRate(from: Currency, to: Currency, action: any, state: ConverterState) {
    const newState: ConverterState = cloneDeep(state);
    const fsym = newState.isInverted ? newState.inCurrency : newState.fromCurrency;
    const tsym = newState.isInverted ? newState.fromCurrency : newState.inCurrency;
    if (from.text === action.data.text) {
        if (to.value !== action.data.value) {
            if (from.onFocus) {
                tsym.value = round(from.value * action.data.value, 5);
            } else if (!to.onFocus) {
                tsym.value = action.data.value;
            } else if (to.onFocus) {
                fsym.value = round(divide(to.value, action.data.value), 5);
            } else if (!from.onFocus) {
                fsym.value = action.data.value;
            }
            newState.rate = action.data.value;
        }
    }
    return updateObject(state, newState);
}

function fetchDataSucceeded(state: ConverterState, action: DataAction) {
    const newState: ConverterState = Object.assign({}, state);
    if (!state.isFethed) {
        newState.fromCurrency = { text: action.data.text, value: 1, onFocus: true };
        newState.inCurrency = { text: 'USD', value: action.data.value, onFocus: false };
        newState.rate = action.data.value;
        newState.isFethed = true;
    } else {
        const { fromCurrency: from, inCurrency: to, isInverted } = state;
        if (isInverted) {
            return refreshRate(to, from, action, state);
        } else {
            return refreshRate(from, to, action, state);
        }
    }
    return updateObject(state, newState);
}

interface ConverterAction {
    value: number,
    currency: string,
    rate: number,
}

function changeCount(state: ConverterState, action: ConverterAction) {
    const { value, currency, rate } = action;
    const newState: ConverterState = cloneDeep(state);
    const fsym = newState.isInverted ? newState.inCurrency : newState.fromCurrency;
    const tsym = newState.isInverted ? newState.fromCurrency : newState.inCurrency;
    if (fsym.text === currency) {
        const refreshedValue = round(value * rate, 5);
        fsym.value = value || 0;
        tsym.value = value ? refreshedValue : 0;
        fsym.onFocus = true;
        tsym.onFocus = false;
    } else if (tsym.text === currency) {
        const refreshedValue = round(divide(value, rate), 5);
        fsym.value = value ? refreshedValue : 0;
        tsym.value = value || 0;
        fsym.onFocus = false;
        tsym.onFocus = true;
    }
    return updateObject(state, newState);
}

function invertCurrencies(state: ConverterState) {
    return updateObject(state, {
        fromCurrency: state.inCurrency,
        inCurrency: state.fromCurrency,
        rate: state.rate,
        isInverted: !state.isInverted,
    });
}

function selectCurrency(state: ConverterState, action: any) {
    const { currency } = action;
    const newState: ConverterState = {
        fromCurrency: { text: currency.text, value: 1, onFocus: true },
        inCurrency: { text: 'USD', value: currency.value, onFocus: false },
        rate: currency.value,
        selectedCurrency: action.currency,
        isInverted: state.isInverted,
        isFethed: state.isFethed,
    };
    if (state.isInverted) {
        newState.fromCurrency = { text: 'USD', value: currency.value, onFocus: true };
        newState.inCurrency = { text: currency.text, value: 1, onFocus: false };
    }
    return updateObject(state, newState);
}

export {
    fetchDataSucceeded,
    changeCount,
    invertCurrencies,
    selectCurrency,
};