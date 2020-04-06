import { connect } from 'react-redux';

import { selectCurrency } from '../../Converter/action-creators';
import component from './component';

const mapStateToProps = state => {
  return {
    table: state.table,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectCurrency: currency => dispatch(selectCurrency(currency)),
  };
};

const TableRows = connect(
  mapStateToProps,
  mapDispatchToProps
)(component);

export default TableRows;