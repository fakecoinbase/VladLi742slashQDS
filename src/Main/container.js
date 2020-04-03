import { connect } from 'react-redux';

import component from './component';
import { fetchData } from "../components/Table/actions";

const mapStateToProps = state => {
    return {
        isLoaded: state.table.isLoaded,
        error: state.table.error,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => dispatch(fetchData()),
    };
};

const Table = connect(
    mapStateToProps,
    mapDispatchToProps
)(component);

export default Table;