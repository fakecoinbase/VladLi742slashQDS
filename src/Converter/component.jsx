import React from 'react';
import {
    InputLabel,
    TextField,
    Button,
} from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const styles = {
    container: { marginBottom: '30px' },
    buttonContainer: { margin: '20px 0' }
};

function setInput(item, ...rest) {
    const [ rate, changeCount ] = rest;
    const styleOnFocus = item.onFocus ? { backgroundColor: 'rgb(230, 238, 255, 0.5)' } : {};
    return (
        <div>
            <InputLabel>{item.text}</InputLabel>
            <TextField
                value={item.value}
                onChange={(e) => changeCount(e.target.value, item.text, rate)}
                fullWidth={true}
                style={styleOnFocus}
            />
        </div>
    );
}

export default (props) => {
    const { fromCurrency, inCurrency, invertCurrencies, rate, changeCount } = props;
    const fromInput = setInput(fromCurrency, rate, changeCount);
    const toInput = setInput(inCurrency, rate, changeCount);
    return (
        <div style={styles.container}>
            {fromInput}
            <div style={styles.buttonContainer}>
                <Button
                    onClick={() => invertCurrencies()}
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                >
                    Поменять местами<ImportExportIcon/>
                </Button>
            </div>
            {toInput}
        </div>
    );
};
