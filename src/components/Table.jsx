import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import TableRows from "./TableRows";

export default () => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Currency</TableCell>
                    <TableCell>USD</TableCell>
                    <TableCell>Trend</TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    <TableRows/>
            </TableBody>
        </Table>
    );
};
