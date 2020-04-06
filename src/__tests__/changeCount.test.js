import { divide, round } from 'lodash';

import { changeCount, invertCurrencies } from "../Converter/action-creators";
import reducer from "../Converter/reducer";

const state = {
   fromCurrency: { text: 'BTC', value: 1, onFocus: true },
   inCurrency: { text: 'USD', value: 6713.86, onFocus: false },
   rate: 6713.86,
   selectedCurrency: {},
   isInverted: false,
   isFethed: true,
};

describe('check changeCount', () => {
   it('from add - to = refresh to', () => {
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'BTC', value: 2, onFocus: true },
         inCurrency: { text: 'USD', value: 2 * state.rate, onFocus: false },
      });
      const action = changeCount(
          expectedState.fromCurrency.value, expectedState.fromCurrency.text, expectedState.rate
      );
      const newState = reducer(state, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('invert: from add - to = refresh to', () => {
      const invertedState = reducer(state, invertCurrencies());
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'USD', value: 2 * state.rate, onFocus: false },
         inCurrency: { text: 'BTC', value: 2, onFocus: true },
         isInverted: true,
      });
      const action = changeCount(
          expectedState.inCurrency.value, expectedState.inCurrency.text, expectedState.rate
      );
      const newState = reducer(invertedState, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('from - to add = refresh from', () => {
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'BTC', value: round(divide(6700, state.rate), 5), onFocus: false },
         inCurrency: { text: 'USD', value: 6700, onFocus: true },
      });
      const action = changeCount(
          expectedState.inCurrency.value, expectedState.inCurrency.text, expectedState.rate
      );
      const newState = reducer(state, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('invert: from - to add = refresh from', () => {
      const invertedState = reducer(state, invertCurrencies());
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'USD', value: 6700, onFocus: true },
         inCurrency: { text: 'BTC', value: round(divide(6700, state.rate), 5), onFocus: false },
         isInverted: true,
      });
      const action = changeCount(
          expectedState.fromCurrency.value, expectedState.fromCurrency.text, expectedState.rate
      );
      const newState = reducer(invertedState, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('from set 0 - to = refresh to', () => {
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'BTC', value: 0, onFocus: true },
         inCurrency: { text: 'USD', value: 0, onFocus: false },
      });
      const action = changeCount(
          expectedState.fromCurrency.value, expectedState.fromCurrency.text, expectedState.rate
      );
      const newState = reducer(state, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('invert: from set 0 - to = refresh to', () => {
      const invertedState = reducer(state, invertCurrencies());
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'USD', value: 0, onFocus: false },
         inCurrency: { text: 'BTC', value: 0, onFocus: true },
         isInverted: true,
      });
      const action = changeCount(
          expectedState.inCurrency.value, expectedState.inCurrency.text, expectedState.rate
      );
      const newState = reducer(invertedState, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('from - to set = refresh from', () => {
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'BTC', value: 0, onFocus: false },
         inCurrency: { text: 'USD', value: 0, onFocus: true },
      });
      const action = changeCount(
          expectedState.inCurrency.value, expectedState.inCurrency.text, expectedState.rate
      );
      const newState = reducer(state, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('invert: from - to set = refresh from', () => {
      const invertedState = reducer(state, invertCurrencies());
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'USD', value: 0, onFocus: true },
         inCurrency: { text: 'BTC', value: 0, onFocus: false },
         isInverted: true,
      });
      const action = changeCount(
          expectedState.fromCurrency.value, expectedState.fromCurrency.text, expectedState.rate
      );
      const newState = reducer(invertedState, action);
      expect(newState).toMatchObject(expectedState);
   });
});
