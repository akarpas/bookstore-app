import React from 'react';
import PropTypes from 'prop-types';
import style from './Delete.scss';

const Delete = props => {
    const { match } = props;
    const { params } = match;
    const { category } = params;

    return <div className={style.headerContainer}>Delete {category}!</div>;
};

export default Delete;

Delete.propTypes = {
    match: PropTypes.object
};
