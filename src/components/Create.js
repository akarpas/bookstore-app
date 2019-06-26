import React, { useState, useLayoutEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGenresLoading, getGenres } from '../reducers/items';
import { createItem, fetchItems } from '../actions/items';
import CreateForm from './CreateForm';
import style from './Create.scss';

const Create = props => {
    const { match, genres, genresLoading } = props;
    const { params } = match;
    const { category } = params;

    const defaultBookValues = {
        title: '',
        price: '',
        genre: 'mystery',
        currency: 'eur'
    };
    const defaultGenreValues = {
        genreName: ''
    };

    const [bookValues, setBookValues] = useState(defaultBookValues);
    const [genreValues, setGenreValues] = useState(defaultGenreValues);
    const [hasDuplicateError, setHasDuplicateError] = useState(false);
    const isBooks = category === 'books';

    useLayoutEffect(() => {
        props.fetchItems('genres');
    }, []);

    useLayoutEffect(() => {
        props.fetchItems('genres');
    }, [category]);

    const submit = event => {
        event.preventDefault();

        if (isBooks) {
            const genreName = genres.find(
                genre => genre.nameId === bookValues.genre
            );
            props.createItem(category, {
                ...bookValues,
                genre: genreName.name
            });
            setBookValues(defaultBookValues);
        } else if (
            genres.findIndex(
                genre => genre.name.toLowerCase() === genreValues.genreName.toLowerCase()
            ) !== -1
        ) {
            setHasDuplicateError(true);
        } else {
            props.createItem(category, genreValues);
            setGenreValues(defaultGenreValues);
        }
    };

    const handleInputChange = event => {
        setHasDuplicateError(false);

        if (isBooks) {
            setBookValues({
                ...bookValues,
                [event.target.id]: event.target.value
            });
        } else {
            setGenreValues({
                ...genreValues,
                [event.target.id]: event.target.value
            });
        }
    };

    return (
        <div className={style.createContainer}>
            <h2>Create a {category.substring(0, category.length - 1)}</h2>
            {genresLoading ? (
                <div>Loading...</div>
            ) : (
                <CreateForm
                    category={category}
                    genreValues={genreValues}
                    bookValues={bookValues}
                    genres={genres}
                    submit={submit}
                    handleInputChange={handleInputChange}
                />
            )}
            {hasDuplicateError && (
                <div className={style.error}>
                    Genre already exists. Please try another.
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        genres: getGenres(state),
        genresLoading: getGenresLoading(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: category => dispatch(fetchItems(category)),
        createItem: (category, item) => dispatch(createItem(category, item))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Create)
);

Create.propTypes = {
    genres: PropTypes.array,
    genresLoading: PropTypes.bool,
    fetchItems: PropTypes.func,
    createItem: PropTypes.func,
    match: PropTypes.object
};
