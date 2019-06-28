import React from 'react';
import PropTypes from 'prop-types';
import { hasResults } from '../utils/hasResults';
import NoResults from './NoResults';

import style from './DeleteList.scss';

const DeleteList = props => {
    const { category, content, handleDeleteItem, handleCheckBox } = props;

    const render = {
        books: items => {
            const noItems = hasResults(items);
            return (
                <div className={style.booksDeleteContainer}>
                    <table cellSpacing="0">
                        <tbody>
                            <tr>
                                <th>Delete: </th>
                                <th>Title: </th>
                                <th>Genre: </th>
                                <th>Price: </th>
                            </tr>
                            {items.map((book, index) => (
                                <tr key={`${book.title + index}row`}>
                                    <td>
                                        <button
                                            onClick={handleDeleteItem}
                                            type="button"
                                            id={book.id}
                                        >
                                            X
                                        </button>
                                    </td>
                                    <td key={book.title + index}>
                                        {book.title}
                                    </td>
                                    <td key={book.title + book.genre + index}>
                                        {book.genre}
                                    </td>
                                    <td
                                        className={style.bookPrice}
                                        key={book.title + book.price + index}
                                    >
                                        {book.price} {book.currency}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {noItems && <NoResults />}
                </div>
            );
        },
        genres: items => {
            const noItems = hasResults(items);
            return (
                <div className={style.genresDeleteContainer}>
                    <table cellSpacing="0">
                        <tbody>
                            <tr>
                                <th>Delete: </th>
                                <th>Genre: </th>
                                <th>Delete books: </th>
                            </tr>
                            {items.map(genre => (
                                <tr key={`${genre.name}row`}>
                                    <td>
                                        <button
                                            onClick={handleDeleteItem}
                                            type="button"
                                            id={genre.id}
                                        >
                                            X
                                        </button>
                                    </td>
                                    <td key={genre.title + genre.genre}>
                                        {genre.name}
                                    </td>
                                    <td>
                                        <input
                                            id={genre.id}
                                            type="checkbox"
                                            onChange={handleCheckBox}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {noItems && <NoResults />}
                </div>
            );
        }
    };

    return render[category](content[category]);
};

export default DeleteList;

DeleteList.propTypes = {
    category: PropTypes.string,
    content: PropTypes.object,
    handleDeleteItem: PropTypes.func,
    handleCheckBox: PropTypes.func
};
