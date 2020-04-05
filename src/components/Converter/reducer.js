import { SELECT_CURRENCY, CHANGE, INVERT } from './actions';
import { FETCH_DATA_SUCCEEDED } from '../Table/actions';
import { selectCurrency, changeCount, invertCurrencies, fetchDataSucceeded } from './functions';

const initialState = {
    fromCurrency: { text: '', value: 1, onFocus: true },
    inCurrency: { text: '', value: 1, onFocus: false },
    rate: 0,
    selectedCurrency: {},
    isInverted: false,
    isFethed: false,
};

export default (state = initialState, action ) => {
  switch (action.type) {
    case SELECT_CURRENCY:
        return selectCurrency(state, action);
    case FETCH_DATA_SUCCEEDED:
        return fetchDataSucceeded(state, action);
    case CHANGE:
        return changeCount(state, action);
    case INVERT:
        return invertCurrencies(state);
    default:
      return state;
  }
};
