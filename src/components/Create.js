import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createItem, fetchItems } from '../actions/items';
import style from './Create.scss';

const Create = props => {
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
    const { match, genres, genresLoading } = props;
    const { params } = match;
    const { category } = params;
    const isBooks = category === 'books';

    useEffect(() => {
        props.fetchItems('genres');
    }, []);

    const submit = event => {
        event.preventDefault();
        console.warn(bookValues, genres)
        if (isBooks) {
            const genreName = genres.find(genre => genre.nameId === bookValues.genre);

            props.createItem(category, { ...bookValues, genre: genreName.name });
            setBookValues(defaultBookValues);
        } else {
            props.createItem(category, genreValues);
            setGenreValues(defaultGenreValues);
        }
    };

    const handleInputChange = event => {
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

    const render = {
        books: () => {
            return (
                <form className={style.createForm} onSubmit={submit}>
                    <label htmlFor="title">
                        Title:
                        <input
                            value={bookValues.title}
                            required
                            onChange={handleInputChange}
                            id="title"
                            type="text"
                        />
                    </label>
                    <label htmlFor="genre">
                        Genre:
                        <select
                            value={bookValues.genre}
                            onChange={handleInputChange}
                            id="genre"
                        >
                            {genres.map(genre =>
                                <option key={genre.id + genre.nameId} value={genre.nameId}>
                                    {genre.name}
                                </option>
                            )})
                        </select>
                    </label>
                    <label htmlFor="price">
                        Price:
                        <input
                            value={bookValues.price}
                            required
                            onChange={handleInputChange}
                            id="price"
                            type="number"
                        />
                    </label>
                    <label htmlFor="currency">
                        Currency:
                        <select
                            value={bookValues.currency}
                            onChange={handleInputChange}
                            id="currency"
                        >
                            <option value="eur">EUR</option>
                            <option value="usd">USD</option>
                        </select>
                    </label>
                    <button type="submit">Create</button>
                </form>
            );
        },
        genres: () => {
            return (
                <form className={style.createForm} onSubmit={submit}>
                    <label htmlFor="title">
                        Name:
                        <input
                            value={genreValues.genreName}
                            required
                            onChange={handleInputChange}
                            id="genreName"
                            type="text"
                        />
                    </label>
                    <button type="submit">Create</button>
                </form>
            );
        }
    };

    return (
        <div className={style.createContainer}>
            <h2>Create a {category.substring(0, category.length - 1)}</h2>
            {genresLoading ? <div>Loading...</div> : render[category]()}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        genres: state.items.genresList,
        genresLoading: state.items.genresLoading
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
