import { FETCH_DATA_SUCCEEDED, FETCH_DATA_FAILED } from './actions';

import { fetchDataSucceeded, fetchDataFailed } from './functions';

export const initialState = {
    rows: [],
    error: '',
    isFetched: false,
};

export default (state = initialState, action)=> {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED:
        return fetchDataSucceeded(state, action);
    case FETCH_DATA_FAILED:
        return fetchDataFailed(state, action);
    default:
      return state;
  }
};