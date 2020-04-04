import { updateObject } from "../../functions";
import { ConverterState, Currency } from "../../interfaces";
import { DataAction } from "../Table/actions";

function updateConverter(from: Currency, to: Currency, action: any, state: ConverterState) {
    const newState: any = Object.assign({}, state);
    if (from.text === action.data.text) {
        if (to.value !== action.data.value) {
            if (newState.isManuallyChanged) {
                to.value = from.value * action.data.value;
                newState.exchangeRate = action.data.value;
            } else {
                to.value = action.data.value;
                newState.exchangeRate = action.data.value;
            }
        }
    }
    return updateObject(state, newState);
}

function fetchDataSucceeded(state: ConverterState, action: DataAction) {
    const newState: ConverterState = Object.assign({}, state);
    if (!state.isFethed) {
        newState.fromCurrency = { text: action.data.text, value: 1 };
        newState.inCurrency = { text: 'USD', value: action.data.value };
        newState.exchangeRate = action.data.value;
        newState.isFethed = true;
    } else {
        const { fromCurrency: from, inCurrency: to, isInverted } = state;
        if (isInverted) {
            return updateConverter(to, from, action, state);
        } else {
            return updateConverter(from, to, action, state);
        }
    }
    return updateObject(state, newState);
}

interface ConverterAction {
    value: number,
    currency: string,
    exchangeRate: number,
}

function changeCount(state: ConverterState, action: ConverterAction) {
    const { value, currency, exchangeRate } = action;
    const from = Object.assign({}, state.fromCurrency);
    const to = Object.assign({}, state.inCurrency);
    if (state.isInverted) {
        if (to.text === currency) {
            to.value = value;
            from.value = value && (value * exchangeRate);
        } else {
            to.value = value && (value / exchangeRate);
            from.value = value;
        }
    } else {
        if (from.text === currency) {
            from.value = value;
            to.value = value && (value * exchangeRate);
        } else {
            from.value = value && (value / exchangeRate);
            to.value = value;
        }
    }
    const newState = { fromCurrency: from, inCurrency: to, isManuallyChanged: true };
    return updateObject(state, newState);
}

function invertCurrencies(state: ConverterState) {
    return updateObject(state, {
        fromCurrency: state.inCurrency,
        inCurrency: state.fromCurrency,
        exchangeRate: state.exchangeRate,
        isInverted: !state.isInverted,
    });
}

function selectCurrency(state: ConverterState, action: any) {
    const { currency } = action;
    const newState: ConverterState = {
        fromCurrency: { text: currency.text, value: 1 },
        inCurrency: { text: 'USD', value: currency.value },
        exchangeRate: currency.value,
        selectedCurrency: action.currency,
        isManuallyChanged: false,
        isInverted: state.isInverted,
        isFethed: state.isFethed,
    };
    if (state.isInverted) {
        newState.fromCurrency = { text: 'USD', value: currency.value };
        newState.inCurrency = { text: currency.text, value: 1 };
    }
    return updateObject(state, newState);
}

export {
    fetchDataSucceeded,
    changeCount,
    invertCurrencies,
    selectCurrency,
};