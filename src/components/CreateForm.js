import React from 'react';
import PropTypes from 'prop-types';

import style from './CreateForm.scss';

const CreateForm = props => {
    const {
        category,
        handleInputChange,
        bookValues,
        genreValues,
        genres,
        submit
    } = props;

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
                            placeholder="Please enter the book's title"
                            title="Please enter the book's title"
                        />
                    </label>
                    <label htmlFor="genre">
                        Genre:
                        <select
                            value={bookValues.genre}
                            onChange={handleInputChange}
                            id="genre"
                        >
                            {genres.map(genre => (
                                <option
                                    key={genre.id + genre.nameId}
                                    value={genre.nameId}
                                >
                                    {genre.name}
                                </option>
                            ))}
                            )
                        </select>
                    </label>
                    <label htmlFor="price">
                        Price:
                        <input
                            value={bookValues.price}
                            required
                            onChange={handleInputChange}
                            id="price"
                            type="text"
                            pattern="[0-9]+([\.][0-9]+)?"
                            placeholder="Please enter a number using dots for (.) for decimal numbers"
                            title="Please enter a number using dots for (.) for decimals."
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
                            placeholder="Please enter a genre"
                            title="Please enter a genre"
                        />
                    </label>
                    <button type="submit">Create</button>
                </form>
            );
        }
    };

    return render[category]();
};

export default CreateForm;

CreateForm.propTypes = {
    category: PropTypes.string,
    handleInputChange: PropTypes.func,
    bookValues: PropTypes.object,
    genreValues: PropTypes.object,
    genres: PropTypes.array,
    submit: PropTypes.func
};
