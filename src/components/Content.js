import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import View from './View';
import Create from './Create';
import Delete from './Delete';
import Update from './Update';
import NoMatch from './NoMatch';

import style from './Content.scss';

const Content = () => (
    <div className={style.contentContainer}>
        <Switch>
            <Redirect exact from="/" to="/view/books" />
            <Route path="/view/:category" component={View} />
            <Route path="/create/:category" component={Create} />
            <Route path="/delete/:category" component={Delete} />
            <Route path="/update/:category" component={Update} />
            <Route component={NoMatch} />
        </Switch>
    </div>
);

export default Content;