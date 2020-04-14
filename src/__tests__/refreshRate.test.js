import { reducer, invertCurrencies } from "../redux/modules/converter";
import { fetchSuccess } from "../redux/modules/table";

const state = {
   fromCurrency: { text: 'BTC', value: 1, onFocus: true },
   inCurrency: { text: 'USD', value: 6713.86, onFocus: false },
   rate: 6713.86,
   selectedCurrency: {},
   isInverted: false,
   isFethed: true,
};

describe('refresh rate', () => {
   it('from.onFocus - to = refresh to', () => {
      const expectedState = {...state,
         fromCurrency: { text: 'BTC', value: 1, onFocus: true },
         inCurrency: { text: 'USD', value: 6800, onFocus: false },
         rate: 6800,
      };
      const action = fetchSuccess({ text: expectedState.fromCurrency.text, value: expectedState.rate });
      const newState = reducer(state, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('invert: from.onFocus - to = refresh to', () => {
      const invertedState = reducer(state, invertCurrencies());
      const expectedState = {...state,
         fromCurrency: { text: 'USD', value: 6800, onFocus: false },
         inCurrency: { text: 'BTC', value: 1, onFocus: true },
         rate: 6800,
         isInverted: true,
      };
      const action = fetchSuccess({ text: expectedState.inCurrency.text, value: expectedState.rate });
      const newState = reducer(invertedState, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('from.onFocus - to = no refresh', () => {
      const expectedState = {...state,
         fromCurrency: { text: 'BTC', value: 1, onFocus: true },
         inCurrency: { text: 'USD', value: 6713.86, onFocus: false },
      };
      const action = fetchSuccess({ text: expectedState.fromCurrency.text, value: state.rate });
      const newState = reducer(state, action);
      expect(newState).toMatchObject(expectedState);
   });

   it('invert: from.onFocus - to = no refresh', () => {
      const invertedState = reducer(state, invertCurrencies());
      const expectedState = {...state,
         fromCurrency: { text: 'USD', value: 6713.86, onFocus: false },
         inCurrency: { text: 'BTC', value: 1, onFocus: true },
         isInverted: true,
      };
      const action = fetchSuccess({ text: expectedState.inCurrency.text, value: state.rate });
      const newState = reducer(invertedState, action);
      expect(newState).toMatchObject(expectedState);
   });
});
