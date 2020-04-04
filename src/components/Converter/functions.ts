import { updateObject } from "../../functions";
import { ConverterState, Currency } from "../../interfaces";
import { DataAction } from "../Table/actions";

function updateConverter(from: Currency, to: Currency, action: any, state: ConverterState) {
    const newState: any = Object.assign({}, state);
    if (from.text === action.data.text) {
        if (to.value !== action.data.value) {
            if (from.onFocus) {
                to.value = from.value * action.data.value;
            } else if (!to.onFocus) {
                to.value = action.data.value;
            } else if (to.onFocus) {
                from.value = to.value / action.data.value;
            } else if (!from.onFocus) {
                from.value = action.data.value;
            }
            newState.exchangeRate = action.data.value;
        }
    }
    return updateObject(state, newState);
}

function fetchDataSucceeded(state: ConverterState, action: DataAction) {
    const newState: ConverterState = Object.assign({}, state);
    if (!state.isFethed) {
        newState.fromCurrency = { text: action.data.text, value: 1, onFocus: false };
        newState.inCurrency = { text: 'USD', value: action.data.value, onFocus: false };
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
    function setCurrencies(from: Currency, to: Currency) {
        if (from.text === currency) {
            from.value = value;
            to.value = value && (value * exchangeRate);
        } else {
            from.value = value && (value / exchangeRate);
            to.value = value;
        }
        from.onFocus = !from.onFocus;
        to.onFocus = !to.onFocus;
    }
    if (state.isInverted) {
        setCurrencies(to, from);
    } else {
        setCurrencies(from, to);
    }
    const newState = { fromCurrency: from, inCurrency: to };
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
        fromCurrency: { text: currency.text, value: 1, onFocus: false, },
        inCurrency: { text: 'USD', value: currency.value, onFocus: false, },
        exchangeRate: currency.value,
        selectedCurrency: action.currency,
        isInverted: state.isInverted,
        isFethed: state.isFethed,
    };
    if (state.isInverted) {
        newState.fromCurrency = { text: 'USD', value: currency.value, onFocus: false, };
        newState.inCurrency = { text: currency.text, value: 1, onFocus: false, };
    }
    return updateObject(state, newState);
}

export {
    fetchDataSucceeded,
    changeCount,
    invertCurrencies,
    selectCurrency,
};