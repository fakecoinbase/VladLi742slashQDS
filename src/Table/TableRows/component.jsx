import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import {
    TrendingFlat as TrendingFlatIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
} from '@material-ui/icons';

import { randomKey } from '../../functions';

export default (props) => {
    const { table, selectCurrency } = props;
    return table.rows.map(row => {
        const { text, value, isIncreased, isDecreased } = row;
        const style = {
            boxShadow: '0 0 5px #d3d3d3',
            cursor: 'pointer',
        };
        let icon = <TrendingFlatIcon/>;
        if (isIncreased) {
            style.backgroundColor = 'rgba(122, 221, 89, 0.3)';
            icon = <TrendingUpIcon/>;
        } else if (isDecreased) {
            style.backgroundColor = 'rgba(255, 206, 206, 0.3)';
            icon = <TrendingDownIcon/>;
        }
        return (
            <TableRow
                onClick={() => selectCurrency({ text, value })}
                key={randomKey()}
                style={style}
            >
                <TableCell width="45%">{text}</TableCell>
                <TableCell width="45%">{value}</TableCell>
                <TableCell width="10%">{icon}</TableCell>
            </TableRow>
        )
    })
};