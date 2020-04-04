import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import Main from "./Main/container";

export default function() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <React.StrictMode>
                    <Main/>
                </React.StrictMode>
            </PersistGate>
        </Provider>
    );
};
