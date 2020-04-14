import { connect } from 'react-redux';

import component from './component';

import { selectCurrency } from "../../redux/modules/converter";

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

const Table = connect(
  mapStateToProps,
  mapDispatchToProps
)(component);

export default Table;