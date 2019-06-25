import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createItem } from '../actions/items';
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
    }
    const [bookValues, setBookValues] = useState(defaultBookValues);
    const [genreValues,setGenreValues] = useState(defaultGenreValues);
    const { match } = props;
    const { params } = match;
    const { category } = params;
    const isBooks = category === 'books';

    const submit = event => {
        event.preventDefault();
        if (isBooks) {
            props.createItem(category, bookValues);
            setBookValues(defaultBookValues)
        } else {
            props.createItem(category, genreValues);
            setGenreValues(defaultGenreValues)
        }
    };

    const handleInputChange = event => {
        if (isBooks) {
            setBookValues({ ...bookValues, [event.target.id]: event.target.value });
        } else {
            setGenreValues({ ...genreValues, [event.target.id]: event.target.value });
        }
    };

    const render = () => {
        return isBooks ? (
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
                        <option value="scienceFiction">Science Fiction</option>
                        <option value="mystery">Mystery</option>
                        <option value="romance">Romance</option>
                        <option value="horror">Horror</option>
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
        ) : (
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
    };

    return (
        <div className={style.createContainer}>
            <h2>Create a {category.substring(0, category.length - 1)}</h2>
            {render()}
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        createItem: (category, item) => dispatch(createItem(category, item))
    };
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(Create)
);

Create.propTypes = {
    createItem: PropTypes.func,
    match: PropTypes.object
};
