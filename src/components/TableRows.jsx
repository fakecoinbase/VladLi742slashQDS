import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableRow, TableCell } from "@material-ui/core";
import {
  TrendingFlat as TrendingFlatIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@material-ui/icons";

import { SELECT_CURRENCY } from "../redux/modules/converter";

import { randomKey } from "../utils/functions";

export default () => {
  const dispatch = useDispatch();
  const table = useSelector((state) => state.table);
  return table.rows.map((row) => {
    const { text, value, isIncreased, isDecreased } = row;
    const selectCurrency = () =>
      dispatch({ type: SELECT_CURRENCY, currency: { text, value } });
    const style = {
      boxShadow: "0 0 5px #d3d3d3",
      cursor: "pointer",
    };
    let icon = <TrendingFlatIcon />;
    if (isIncreased) {
      style.backgroundColor = "rgba(122, 221, 89)";
      icon = <TrendingUpIcon />;
    } else if (isDecreased) {
      style.backgroundColor = "rgb(212, 64, 64)";
      icon = <TrendingDownIcon />;
    }
    return (
      <TableRow onClick={selectCurrency} key={randomKey()} style={style}>
        <TableCell width="45%">{text}</TableCell>
        <TableCell width="45%">{value}</TableCell>
        <TableCell width="10%">{icon}</TableCell>
      </TableRow>
    );
  });
};
