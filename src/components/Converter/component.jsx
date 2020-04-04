import React from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Button from '@material-ui/core/Button';

const container = { marginBottom: '30px' };
const buttonContainer = { margin: '20px 0' };

export default (props) => {
    const {
        fromCurrency,
        inCurrency,
        exchangeRate,
        changeCount,
        invertCurrencies,
    } = props;
    return (
        <div style={container}>
            <InputLabel>{fromCurrency.text}</InputLabel>
            <TextField
                value={fromCurrency.value}
                onChange={(e) => changeCount(e.target.value, fromCurrency.text, exchangeRate)}
                fullWidth={true}
            />
            <div style={buttonContainer}>
                <Button
                    onClick={() => invertCurrencies()}
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                >
                    Поменять местами<ImportExportIcon/>
                </Button>
            </div>
            <InputLabel>{inCurrency.text}</InputLabel>
            <TextField
                value={inCurrency.value}
                onChange={(e) => changeCount(e.target.value, inCurrency.text, exchangeRate)}
                fullWidth={true}
            />
        </div>
    );
};
