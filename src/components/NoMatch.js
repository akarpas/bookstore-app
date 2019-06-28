import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './NoMatch.scss';

const NoMatch = props => {
    const { location } = props;
    const { pathname } = location;
    return (
        <div className={style.noMatchContainer}>
            No match for path <em>{pathname}</em>. Please go back to:
            <br /><br />
            <Link to="/view/books">View Books</Link>
        </div>
    );
};

export default NoMatch;

NoMatch.propTypes = {
    location: PropTypes.object
};