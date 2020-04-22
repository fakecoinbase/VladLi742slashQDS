import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { FETCH_DATA } from "../redux/modules/table";

import Converter from "./Converter";
import Table from "./Table";

const styles = {
  container: { padding: "24px", boxShadow: "0 0 10px #d3d3d3" },
  h1: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "unset",
    textAlign: "center",
  },
};

export default function () {
  const dispatch = useDispatch();
  const { isFetched, error } = useSelector((state) => state.table);

  useEffect(() => {
    dispatch({ type: FETCH_DATA });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isFetched ? (
    <Container maxWidth="sm" style={styles.container}>
      <h1 style={styles.h1}>Конвертер валют</h1>
      <Converter />
      <Table />
    </Container>
  ) : error ? (
    <Alert variant="filled" severity="error">
      {error}
    </Alert>
  ) : (
    <LinearProgress />
  );
}
