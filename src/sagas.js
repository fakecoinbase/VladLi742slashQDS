import { all, put, takeLatest, delay } from 'redux-saga/effects';

import Api from './websocket.js';

function* fetchCoins() {
    yield delay(1000);
    try {
        const data = yield JSON.parse(Api.data);
        const newData = { text: data.FSYM, value: data.P };
        yield put({ type: "FETCH_DATA_SUCCEEDED", data: newData });
        yield put({ type: "FETCH_DATA" });
    } catch (e) {
        yield put({ type: "DATA_FETCH_FAILED", message: e.message });
    }
}

function* watchIncrementAsync() {
    yield takeLatest('FETCH_DATA', fetchCoins);
}

export default function* rootSaga() {
    yield all([
        watchIncrementAsync(),
    ])
}