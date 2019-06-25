import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

const middleware = applyMiddleware(thunk, logger);

export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(middleware)
    );
}
