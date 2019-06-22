import React from 'react';
import PropTypes from 'prop-types';
import style from './Update.scss';

const Update = props => {
    const { match } = props;
    const { params } = match;
    const { category } = params;

    return <div className={style.headerContainer}>Update {category}!</div>;
};

export default Update;

Update.propTypes = {
    match: PropTypes.object
};
