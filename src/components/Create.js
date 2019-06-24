import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Create.scss';

const Create = props => {
    const [state, setState] = useState({
        title: '',
        price: null,
        genre: 'mystery',
        currency: 'eur',
    });
    const { match } = props;
    const { params } = match;
    const { category } = params;

    const submit = event => {
        event.preventDefault();
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
                    <input onChange={handleInputChange} id="title" type="text" />
                </label>
                <label htmlFor="genre">
                    Genre:
                    <select value={state.genre} onChange={handleInputChange} id="genre">
                        <option value="scienceFiction">Science Fiction</option>
                        <option value="mystery">Mystery</option>
                        <option value="romance">Romance</option>
                        <option value="horror">Horror</option>
                    </select>
                </label>
                <label htmlFor="price">
                    Price:
                    <input onChange={handleInputChange} id="price" type="number" />
                </label>
                <label htmlFor="currency">
                    Currency:
                    <select onChange={handleInputChange} id="currency">
                        <option value="eur">EUR</option>
                        <option value="usd">USD</option>
                    </select>
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Create;

Create.propTypes = {
    match: PropTypes.object
};
