import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import {
    TrendingFlat as TrendingFlatIcon,
    TrendingUp as TrendingUpIcon,
    TrendingDown as TrendingDownIcon,
} from '@material-ui/icons';

import { randomKey } from '../functions';

export default (props) => {
    const { selectCurrency, table } = props;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Currency</TableCell>
                    <TableCell>USD</TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                {table.rows.map(row => {
                    const { text, value, isIncreased, isDecreased } = row;
                    let icon = <TrendingFlatIcon/>;
                    const style = {
                        boxShadow: '0 0 5px #d3d3d3',
                        cursor: 'pointer',
                    };
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
                            <TableCell>{text}</TableCell>
                            <TableCell>{value}</TableCell>
                            <TableCell>{icon}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
};
