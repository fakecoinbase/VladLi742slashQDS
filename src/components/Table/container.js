import { connect } from 'react-redux';

import { selectCurrency } from '../Converter/actions';
import component from './component';

const mapStateToProps = state => {
  return {
    table: state.table,
    selectedCurrency: state.converter.selectedCurrency,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectCurrency: currency => dispatch(selectCurrency(currency)),
  };
};

const Table = connect(
  mapStateToProps,
  mapDispatchToProps
)(component);

export default Table;