import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';

import { randomKey } from '../../functions';

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
                    const { text, value } = row;
                    return (
                        <TableRow
                            onClick={() => selectCurrency({ text, value })}
                            key={randomKey()}
                        >
                            <TableCell>{text}</TableCell>
                            <TableCell>{value}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
};
