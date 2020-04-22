import {
  reducer,
  selectCurrency,
  invertCurrencies,
} from "../redux/modules/converter";

const state = {
  fromCurrency: { text: "BTC", value: 1, onFocus: true },
  inCurrency: { text: "USD", value: 6713.86, onFocus: false },
  rate: 6713.86,
  selectedCurrency: {},
  isInverted: false,
  isFethed: true,
};

describe("select currency", () => {
  it("select(from): from.onFocus - to = no refresh", () => {
    const action = selectCurrency({
      text: state.fromCurrency.text,
      value: state.rate,
    });
    const newState = reducer(state, action);
    expect(newState).toMatchObject(state);
  });

  it("invert & select(from): from.onFocus - to = no refresh", () => {
    const invertedState = reducer(state, invertCurrencies());
    const expectedState = Object.assign({}, state, {
      fromCurrency: { text: "USD", value: 6713.86, onFocus: true },
      inCurrency: { text: "BTC", value: 1, onFocus: false },
      selectedCurrency: { text: "BTC", value: 6713.86 },
      isInverted: true,
    });
    const action = selectCurrency(expectedState.selectedCurrency);
    const newState = reducer(invertedState, action);
    expect(newState).toMatchObject(expectedState);
  });

  it("select(to): from.onFocus - to = refresh to", () => {
    const expectedState = Object.assign({}, state, {
      fromCurrency: { text: "ETH", value: 1, onFocus: true },
      inCurrency: { text: "USD", value: 140, onFocus: false },
      rate: 140,
      selectedCurrency: { text: "ETH", value: 140 },
    });
    const action = selectCurrency(expectedState.selectedCurrency);
    const newState = reducer(state, action);
    expect(newState).toMatchObject(expectedState);
  });

  it("invert & select(to): from.onFocus - to = refresh to", () => {
    const invertedState = reducer(state, invertCurrencies());
    const expectedState = Object.assign({}, state, {
      fromCurrency: { text: "USD", value: 140, onFocus: true },
      inCurrency: { text: "ETH", value: 1, onFocus: false },
      rate: 140,
      selectedCurrency: { text: "ETH", value: 140 },
      isInverted: true,
    });
    const action = selectCurrency(expectedState.selectedCurrency);
    const newState = reducer(invertedState, action);
    expect(newState).toMatchObject(expectedState);
  });
});
