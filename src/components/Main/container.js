import { connect } from 'react-redux';

import { fetchData } from "../../redux/modules/table";

import component from './component';

const mapStateToProps = state => {
    return {
        isFetched: state.table.isFetched,
        error: state.table.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchData()),
    };
};

const Table = connect(
    mapStateToProps,
    mapDispatchToProps
)(component);

export default Table;