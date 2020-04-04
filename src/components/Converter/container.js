import { connect } from 'react-redux';

import { changeCount, invertCurrencies } from './actions';
import component from './component';

const mapStateToProps = state => {
  return {
      fromCurrency: state.converter.fromCurrency,
      inCurrency: state.converter.inCurrency,
      rate: state.converter.rate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCount: (value, currency, rate) => dispatch(changeCount(value, currency, rate)),
    invertCurrencies: () => dispatch(invertCurrencies()),
  };
};

const Converter = connect(
  mapStateToProps,
  mapDispatchToProps
)(component);

export default Converter;