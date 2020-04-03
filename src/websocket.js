const Api = { data: {} };

const createWebSocketConnection = () => {
    const apiKey = "6cb0216625d1aaab0ce177410c490178da22c3a32c98dd64a1692760bb2b72e4";
    const socket = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);

    socket.onopen = function () {
        const subRequest = {
            "action": "SubAdd",
            "subs": ["0~Coinbase~BTC~USD", "0~Coinbase~ETH~USD"],
        };
        socket.send(JSON.stringify(subRequest));
    };

    socket.onmessage = function onStreamMessage(event) {
        if (JSON.parse(event.data)["TYPE"] === "0") {
            Api.data = event.data;
        }
    };
};

createWebSocketConnection();

export default Api;
