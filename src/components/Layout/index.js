import React from 'react';
import PropTypes from 'prop-types';

import style from './index.scss';

const Layout = props => {
    const { children, title } = props;
    return (
        <div className={style.layoutContainer}>
            <h2 className={style.layoutHeader}>{title}</h2>
            {children}
        </div>
    );
};

export default Layout;

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    title: PropTypes.string
};
