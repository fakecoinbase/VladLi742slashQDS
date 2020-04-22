import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    InputLabel,
    TextField,
    Button,
} from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import { CHANGE, INVERT } from "../redux/modules/converter";

const styles = {
    container: { marginBottom: '30px' },
    buttonContainer: { margin: '20px 0' }
};

function Currency({ role }) {
    const dispatch = useDispatch();
    const { [role]: item, rate } = useSelector(state => state.converter);
    const onChange = useCallback(e => {
        dispatch({ type: CHANGE, value: e.target.value, currency: item.text, rate });
    }, [item, rate, dispatch]);
    const styleOnFocus = item.onFocus ? { backgroundColor: 'rgb(230, 238, 255, 0.5)' } : {};
    return (
        <div>
            <InputLabel>{item.text}</InputLabel>
            <TextField
                value={item.value}
                onChange={onChange}
                fullWidth={true}
                style={styleOnFocus}
            />
        </div>
    );
}

export default () => {
    const dispatch = useDispatch();
    const invertCurrencies = () => dispatch({ type: INVERT });
    return (
        <div style={styles.container}>
            <Currency role="fromCurrency"/>
            <div style={styles.buttonContainer}>
                <Button
                    onClick={invertCurrencies}
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                >
                    Поменять местами<ImportExportIcon/>
                </Button>
            </div>
            <Currency role="inCurrency"/>
        </div>
    );
};
