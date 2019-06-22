import React from 'react';
import PropTypes from 'prop-types';
import style from './Create.scss';

const Create = props => {
    const { match } = props;
    const { params } = match;
    const { category } = params;

    return <div className={style.headerContainer}>Create {category}!</div>;
};

export default Create;

Create.propTypes = {
    match: PropTypes.object
};
