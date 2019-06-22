import React from 'react';

import Header from './Header';
import Content from './Content';

import style from './App.scss';

const App = () => (
    <div className={style.appContainer}>
        <div className={style.wrapper}>
            <Header />
            <Content />
        </div>
    </div>
);

export default App;