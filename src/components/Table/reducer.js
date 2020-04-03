import { FETCH_DATA_SUCCEEDED } from './actions';
import { fetchDataSucceeded } from './functions';

const initialState = {
    rows: [],
    error: '',
    isLoaded: false,
};

export default (state = initialState, action)=> {
  switch (action.type) {
    case FETCH_DATA_SUCCEEDED:
        return fetchDataSucceeded(state, action);
    default:
      return state;
  }
};