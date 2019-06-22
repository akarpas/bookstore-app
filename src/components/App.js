import React from 'react';

import Header from './Header';
import Content from './Content';

import style from './App.scss';

const App = () => (
    <div className={style.appContainer}>
        <Header />
        <Content />
    </div>
);

export default App;