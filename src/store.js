import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootSaga from './sagas';
import table from './Table/reducer';
import converter from './Converter/reducer';

const rootReducer = combineReducers({
    table,
    converter,
});

const persistConfig = {
  key: 'root',
  storage
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store   = createStore(
    persistReducer(persistConfig, rootReducer),
    composeEnhancers(applyMiddleware(createLogger(), sagaMiddleware))
);

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
