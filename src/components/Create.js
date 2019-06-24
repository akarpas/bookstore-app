import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createItem } from '../actions/items';
import style from './Create.scss';

const Create = props => {
    const initialState = {
        title: '',
        price: '',
        genre: 'mystery',
        currency: 'eur'
    };
    const [state, setState] = useState(initialState);
    const { match } = props;
    const { params } = match;
    const { category } = params;

    const submit = event => {
        event.preventDefault();
        props.createItem(category, state);
        setState(initialState);
    };

    const handleInputChange = event => {
        setState({ ...state, [event.target.id]: event.target.value });
    };

    return (
        <div className={style.createContainer}>
            <h2>Create a {category.substring(0, category.length - 1)}</h2>
            <form className={style.createForm} onSubmit={submit}>
                <label htmlFor="title">
                    Title:
                    <input
                        value={state.title}
                        required
                        onChange={handleInputChange}
                        id="title"
                        type="text"
                    />
                </label>
                <label htmlFor="genre">
                    Genre:
                    <select
                        value={state.genre}
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
                        value={state.price}
                        required
                        onChange={handleInputChange}
                        id="price"
                        type="number"
                    />
                </label>
                <label htmlFor="currency">
                    Currency:
                    <select
                        value={state.currency}
                        onChange={handleInputChange}
                        id="currency"
                    >
                        <option value="eur">EUR</option>
                        <option value="usd">USD</option>
                    </select>
                </label>
                <button type="submit">Create</button>
            </form>
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
