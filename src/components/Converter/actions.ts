import { Item } from "../../interfaces";

export const SELECT_CURRENCY = 'SELECT_CURRENCY';
export const CHANGE = 'CHANGE_COUNT_CURRENCIES';
export const INVERT = 'INVERT_CURRENCIES';

export const changeCount = (value: number, currency: string, rate: number) => ({
    type: CHANGE,
    value,
    currency,
    rate,
});

export const invertCurrencies = () => ({
    type: INVERT,
});

export const selectCurrency = (currency: Item) => ({
    type: SELECT_CURRENCY,
    currency,
});
