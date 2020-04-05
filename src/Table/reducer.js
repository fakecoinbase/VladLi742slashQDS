import { FETCH_DATA_SUCCEEDED, FETCH_DATA_FAILED } from './actions';
import { fetchDataSucceeded, fetchDataFailed } from './functions';

const initialState = {
    rows: [],
    error: '',
    isLoaded: false,
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