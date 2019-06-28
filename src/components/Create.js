import React, { useState, useLayoutEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import capitalize from 'capitalize';
import { getGenresLoading, getGenres } from '../reducers/items';
import { createItem, fetchItems } from '../actions/items';
import CreateForm from './CreateForm';
import Layout from './Layout';
import style from './Create.scss';

const BOOKS = 'books';
const GENRES = 'genres';

const Create = props => {
    const { match, genres, genresLoading } = props;
    const { params } = match;
    const { category } = params;
    const defaultBookValues = {
        title: '',
        price: '',
        genre: genres[0].name,
        currency: 'eur'
    };
    const defaultGenreValues = {
        genreName: ''
    };
    const [bookValues, setBookValues] = useState(defaultBookValues);
    const [genreValues, setGenreValues] = useState(defaultGenreValues);
    const [hasDuplicateError, setHasDuplicateError] = useState(false);
    const [hasCreatedSuccessfully, setHasCreatedSuccessfully] = useState(false);
    const isBooks = category === BOOKS;

    const resetMessages = () => {
        setHasDuplicateError(false);
        setHasCreatedSuccessfully(false);
    };

    useLayoutEffect(() => {
        props.fetchItems(GENRES);
    }, []);

    useLayoutEffect(() => {
        props.fetchItems(GENRES);
        resetMessages();
    }, [category]);

    const submit = event => {
        event.preventDefault();
        if (isBooks) {
            const genreName = genres.find(
                genre => genre.name.toLowerCase() === bookValues.genre.toLowerCase()
            );
            props.createItem(category, {
                ...bookValues,
                genre: genreName.name
            });
            setBookValues(defaultBookValues);
            setHasCreatedSuccessfully(true);
        } else if (
            genres.findIndex(
                genre =>
                    genre.name.toLowerCase() ===
                    genreValues.genreName.toLowerCase()
            ) !== -1
        ) {
            setHasDuplicateError(true);
        } else {
            props.createItem(category, genreValues);
            setGenreValues(defaultGenreValues);
            setHasCreatedSuccessfully(true);
        }
    };

    const handleInputChange = event => {
        resetMessages();

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
        <Layout title={`Create a ${category.substring(0, category.length - 1)}`}>
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
                    {capitalize(category.slice(0, category.length - 1))} already
                    exists. Please try another.
                </div>
            )}
            {hasCreatedSuccessfully && (
                <div className={style.success}>
                    {capitalize(category.slice(0, category.length - 1))} created
                    successfully!
                </div>
            )}
        </Layout>
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
