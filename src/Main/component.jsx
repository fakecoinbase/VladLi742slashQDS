import React, { useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';

import Converter from '../components/Converter/container';
import Table from '../components/Table/container';

const container = {
    padding: "24px",
    boxShadow: '0 0 10px #d3d3d3',
};
const h1 = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'unset',
    textAlign: 'center',
};

export default function (props) {
    useEffect(() => {
        const { fetchData } = props;
        fetchData();
    }, []);

    return (
        props.isLoaded ? (
            <Container
                maxWidth="sm"
                style={container}
            >
                <h1 style={h1}>Конвертер валют</h1>
                <Converter/>
                <Table/>
            </Container>
        ) : <LinearProgress/>
    );
};