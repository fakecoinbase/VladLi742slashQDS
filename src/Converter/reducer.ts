import { SELECT_CURRENCY, CHANGE, INVERT } from './actions';
import * as actions from "./action-creators";

import { ConverterState } from "../interfaces";
import { InferValueTypes } from "../customTypes";

import { selectCurrency, changeCount, invertCurrencies, refreshRate } from './functions';
import {FETCH_DATA_SUCCEEDED} from "../Table/actions";

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const initialState: ConverterState = {
    fromCurrency: { text: '', value: 1, onFocus: true },
    inCurrency: { text: '', value: 1, onFocus: false },
    rate: 0,
    selectedCurrency: {},
    isInverted: false,
    isFethed: false,
};

export default (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case SELECT_CURRENCY:
            return selectCurrency(state, action);
        case FETCH_DATA_SUCCEEDED:
            return refreshRate(state, action);
        case CHANGE:
            return changeCount(state, action);
        case INVERT:
            return invertCurrencies(state);
        default:
          return state;
    }
};
