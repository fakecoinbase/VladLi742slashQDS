import { connect } from 'react-redux';

import { changeCount, invertCurrencies } from './actions';
import component from './component';

const mapStateToProps = state => {
  return {
      fromCurrency: state.converter.fromCurrency,
      inCurrency: state.converter.inCurrency,
      exchangeRate: state.converter.exchangeRate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCount: (value, currency, exchangeRate) => dispatch(changeCount(value, currency, exchangeRate)),
    invertCurrencies: () => dispatch(invertCurrencies()),
  };
};

const Converter = connect(
  mapStateToProps,
  mapDispatchToProps
)(component);

export default Converter;