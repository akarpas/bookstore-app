import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/array';
import 'core-js/es/regexp';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './store';
import App from './components/App';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={configureStore()}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
