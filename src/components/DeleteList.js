import React from 'react';
import PropTypes from 'prop-types';

import style from './DeleteList.scss';

const DeleteList = props => {
    const {
        category,
        content,
        handleDeleteItem
    } = props;

    const render = {
        books: items => {
            return (
                <table cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Delete: </th>
                            <th>Title: </th>
                            <th>Genre: </th>
                            <th>Price: </th>
                        </tr>
                        {items.map(book => (
                            <tr key={`${book.title}row`}>
                                <td>
                                    <button
                                        onClick={handleDeleteItem}
                                        type="button"
                                        id={book.id}
                                    >
                                        X
                                    </button>
                                </td>
                                <td key={book.title}>{book.title}</td>
                                <td key={book.title + book.genre}>
                                    {book.genre}
                                </td>
                                <td
                                    className={style.bookPrice}
                                    key={book.title + book.price}
                                >
                                    {book.price} {book.currency}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        },
        genres: items => {
            return (
                <table cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Delete: </th>
                            <th>Genre: </th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    };

    return render[category](content[category]);
};

export default DeleteList;

DeleteList.propTypes = {
    genres: PropTypes.array,
    genresLoading: PropTypes.bool,
    fetchItems: PropTypes.func,
    createItem: PropTypes.func,
    match: PropTypes.object
};
