import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import Main from "./components/Main";

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
