import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

const isDevelopment = process.env.NODE_ENV === 'development';
const middleware = isDevelopment ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

export default function configureStore(initialState = {}) {
    return isDevelopment ? createStore(
        rootReducer,
        initialState,
        composeWithDevTools(middleware)
    ) : createStore(
        rootReducer,
        initialState,
        middleware
    );
}
