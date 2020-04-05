import { invertCurrencies } from "../Converter/actions";
import reducer from "../Converter/reducer";

const state = {
   fromCurrency: { text: 'BTC', value: 1, onFocus: true },
   inCurrency: { text: 'USD', value: 6713.86, onFocus: false },
   rate: 6713.86,
   selectedCurrency: {},
   isInverted: false,
   isFethed: true,
};

describe('invert currencies', () => {
   it('from - to = to - from', () => {
      const invertedState = reducer(state, invertCurrencies());
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'USD', value: 6713.86, onFocus: false },
         inCurrency: { text: 'BTC', value: 1, onFocus: true },
         isInverted: true,
      });
      expect(expectedState).toMatchObject(invertedState);
   });

   it('double from - to = from - to', () => {
      const invertedState = reducer(state, invertCurrencies());
      const newState = reducer(invertedState, invertCurrencies());
      const expectedState = Object.assign({}, state, {
         fromCurrency: { text: 'BTC', value: 1, onFocus: true },
         inCurrency: { text: 'USD', value: 6713.86, onFocus: false },
      });
      expect(expectedState).toMatchObject(newState);
   });
});
