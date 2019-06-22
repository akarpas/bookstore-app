import React from 'react';
import PropTypes from 'prop-types';
import style from './View.scss';

const View = props => {
    const { match } = props;
    const { params } = match;
    const { category } = params;

    return <div className={style.headerContainer}>View {category}!</div>;
};

export default View;

View.propTypes = {
    match: PropTypes.object
};
