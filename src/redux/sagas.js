import { eventChannel, END } from 'redux-saga';
import { put, call, take, takeLatest, all } from 'redux-saga/effects';
import { FETCH_DATA, FETCH_SUCCESS, FETCH_FAIL } from "./modules/table";

function createEventChannel(ws) {
    return eventChannel(emit => {
        function createWs() {
            ws.onopen = () => {
                const subRequest = {
                    "action": "SubAdd",
                    "subs": [
                        "0~Coinbase~BTC~USD",
                        "0~Coinbase~ETH~USD",
                        "0~Coinbase~XRP~USD",
                        "0~Coinbase~BCH~USD",
                        "0~Coinbase~LTC~USD",
                        "0~Coinbase~EOS~USD",
                        "0~Coinbase~XTZ~USD",
                    ],
                };
                ws.send(JSON.stringify(subRequest));
            };

            ws.onerror = error => {
                console.log("ERROR: ", error);
            };

            ws.onmessage = e => {
                if (JSON.parse(e.data)["TYPE"] === "0") {
                    return emit(JSON.parse(e.data))
                }
            };

            ws.onclose = e => {
                if (e.code === 1005) {
                    console.log("WebSocket: closed");
                    const subRequest = {
                        "action": "SubRemove",
                        "subs": [
                            "0~Coinbase~BTC~USD",
                            "0~Coinbase~ETH~USD",
                            "0~Coinbase~XRP~USD",
                            "0~Coinbase~BCH~USD",
                            "0~Coinbase~LTC~USD",
                            "0~Coinbase~EOS~USD",
                            "0~Coinbase~XTZ~USD",
                        ],
                    };
                    ws.send(JSON.stringify(subRequest));
                    emit(END);
                } else {
                    console.log('Socket is closed Unexpectedly. Reconnect will be attempted in 4 second.', e.reason);
                    setTimeout(() =>  {
                        createWs();
                    }, 4000);
                }
            };
        }
        createWs();

        return () => {
            console.log("Closing Websocket");
            ws.close();
        };
    });
}

function* fetchDataChannel() {
    const apiKey = "6cb0216625d1aaab0ce177410c490178da22c3a32c98dd64a1692760bb2b72e4";
    const socket = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
    const channel = yield call(createEventChannel, socket);
    while (true) {
        try {
            const trade = yield take(channel);
            const data = { text: trade.FSYM, value: trade.P };
            yield put({ type: FETCH_SUCCESS, data });
        }
        catch(err) {
            yield put({ type: FETCH_FAIL, message: err.message });
        }
    }
}

function* watchFetchDataAsync() {
    yield takeLatest(FETCH_DATA, fetchDataChannel);
}

export default function* rootSaga() {
    yield all([
        watchFetchDataAsync(),
    ])
}
