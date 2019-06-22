import React from 'react';
import { Route, Switch } from 'react-router-dom';
import View from './View';
import Create from './Create';
import Delete from './Delete';
import Update from './Update';

import style from './Content.scss';

const Content = () => (
    <div className={style.contentContainer}>
        <Switch>
            <Route path="/view/:category" component={View} />
            <Route path="/create/:category" component={Create} />
            <Route path="/delete/:category" component={Delete} />
            <Route path="/update/:category" component={Update} />
        </Switch>
    </div>
);

export default Content;