import { FETCH_DATA, FETCH_DATA_SUCCEEDED, FETCH_DATA_FAILED} from './actions';
import * as actions from './action-creators';

import { TableState } from "../interfaces";
import { InferValueTypes } from "../customTypes";

import { fetchDataSucceeded, fetchDataFailed } from './functions';
import { updateObject } from "../functions";

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const initialState: TableState = {
    rows: [],
    error: '',
    isFetched: false,
};

export default (state = initialState, action: ActionTypes)=> {
    switch (action.type) {
        case FETCH_DATA:
            return updateObject(state, action);
        case FETCH_DATA_SUCCEEDED:
            return fetchDataSucceeded(state, action);
        case FETCH_DATA_FAILED:
            return fetchDataFailed(state, action);
        default:
          return state;
    }
};