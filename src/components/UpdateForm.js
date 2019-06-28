import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import { compare } from '../utils/compare';
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
            const contentCopy = cloneDeep(content);
            const booksCopy = cloneDeep(books);
            const genresCopy = cloneDeep(genres);
            return contentCopy.sort(compare).map((book, index) => {
                const sortedBooks = booksCopy.sort(compare);
                const hasUpdates =
                    contentCopy[index].title !== sortedBooks[index].title ||
                    contentCopy[index].price !== sortedBooks[index].price ||
                    contentCopy[index].genre !== sortedBooks[index].genre ||
                    contentCopy[index].currency !== sortedBooks[index].currency;

                return (
                    <div
                        key={`${index}bookSection`}
                        className={style.itemSection}
                    >
                        <form
                            id={book.id}
                            key={`${index}bookForm`}
                            onSubmit={handleUpdateItem}
                        >
                            <input
                                key={`${index}bookTitle`}
                                onChange={handleInputChange}
                                id={`title-${book.id}`}
                                type="text"
                                value={book.title}
                            />
                            <select
                                key={`${index}bookGenre`}
                                value={book.genre.toLowerCase()}
                                onChange={handleInputChange}
                                id={`genre-${book.id}`}
                            >
                                {genresCopy.map(genre => (
                                    <option
                                        key={genre.name.toLowerCase()}
                                        value={genre.name.toLowerCase()}
                                    >
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                className={style.inputPrice}
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
                                    hasUpdates
                                        ? style.buttonUpdate
                                        : style.button
                                }
                                type="submit"
                                id={book.id}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                );
            });
        },
        genres: content => {
            const contentCopy = cloneDeep(content);
            const genresCopy = cloneDeep(genres);
            return contentCopy.sort(compare).map((genre, index) => {
                const sortedGenres = genresCopy.sort(compare);
                const hasUpdates =
                    contentCopy[index].name !== sortedGenres[index].name;

                return (
                    <div
                        key={`${index}genreSection`}
                        className={style.itemSection}
                    >
                        <form
                            id={genre.id}
                            key={`${index}genreForm`}
                            onSubmit={handleUpdateItem}
                        >
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
                                    hasUpdates
                                        ? style.buttonUpdate
                                        : style.button
                                }
                                type="submit"
                                id={genre.id}
                            >
                                Update
                            </button>
                        </form>
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
