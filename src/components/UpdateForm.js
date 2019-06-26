import React from 'react';
import PropTypes from 'prop-types';

import style from './UpdateForm.scss';

const UpdateForm = props => {
    const {
        category,
        handleInputChange,
        handleUpdateItem,
        books,
        genres,
        itemValues
    } = props;

    const render = {
        books: content => {
            return content.map((book, index) => {
                const hasUpdates =
                    content[index].title !== books[index].title ||
                    content[index].price !== books[index].price ||
                    content[index].genre !== books[index].genre ||
                    content[index].currency !== books[index].currency;

                return (
                    <div key={`${index}bookSection`} className={style.itemSection}>
                        <input
                            key={`${index}bookTitle`}
                            onChange={handleInputChange}
                            id={`title-${book.id}`}
                            type="text"
                            value={book.title}
                        />
                        <select
                            key={`${index}bookGenre`}
                            value={book.genre}
                            onChange={handleInputChange}
                            id={`genre-${book.id}`}
                        >
                            <option value="scienceFiction">
                                Science Fiction
                            </option>
                            <option value="mystery">Mystery</option>
                            <option value="romance">Romance</option>
                            <option value="horror">Horror</option>
                        </select>
                        <input
                            key={`${index}bookPrice`}
                            onChange={handleInputChange}
                            id={`price-${book.id}`}
                            type="number"
                            value={book.price}
                        />
                        <select
                            key={`${index}bookCurrency`}
                            value={book.currency}
                            onChange={handleInputChange}
                            id={`currency-${book.id}`}
                        >
                            <option value="eur">EUR</option>
                            <option value="usd">USD</option>
                        </select>
                        <button
                            key={`${index}bookButton`}
                            className={
                                hasUpdates ? style.buttonUpdate : style.button
                            }
                            onClick={handleUpdateItem}
                            type="button"
                            id={book.id}
                        >
                            Update
                        </button>
                    </div>
                );
            });
        },
        genres: content => {
            return content.map((genre, index) => {
                const hasUpdates = content[index].name !== genres[index].name;

                return (
                    <div key={`${index}genreSection`} className={style.itemSection}>
                        <input
                            key={`${index}genreName`}
                            onChange={handleInputChange}
                            id={`name-${genre.id}`}
                            type="text"
                            value={genre.name}
                        />
                        <button
                            key={`${index}genreButton`}
                            className={
                                hasUpdates ? style.buttonUpdate : style.button
                            }
                            onClick={handleUpdateItem}
                            type="button"
                            id={genre.id}
                        >
                            Update
                        </button>
                    </div>
                );
            });
        }
    };

    return render[category](itemValues[category]);
};

export default UpdateForm;

UpdateForm.propTypes = {
    category: PropTypes.string,
    handleInputChange: PropTypes.func,
    handleUpdateItem: PropTypes.func,
    books: PropTypes.array,
    itemValues: PropTypes.object,
    genres: PropTypes.array
};
