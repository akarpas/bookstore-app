import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import { compare } from '../utils/compare';
import style from './ViewList.scss';

const ViewList = props => {
    const { category, content } = props;
    const [searchInput, setSearchInput] = useState('');
    const handleChange = event => {
        setSearchInput(event.target.value);
    };

    const render = {
        books: items => {
            const itemsCopy = cloneDeep(items);
            return (
                <div style={{ width: '100%' }}>
                    <input
                        type="text"
                        onChange={event => handleChange(event)}
                    />
                    <table>
                        <tbody>
                            <tr>
                                <th>Title: </th>
                                <th>Genre: </th>
                                <th>Price: </th>
                            </tr>
                            {itemsCopy
                                .sort(compare)
                                .filter(book => {
                                    if (searchInput.length === 0) return book;
                                    return book.title
                                        .toLowerCase()
                                        .includes(searchInput.toLowerCase());
                                })
                                .map(book => (
                                    <tr key={`${book.title}row`}>
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
                </div>
            );
        },
        genres: items => {
            const itemsCopy = cloneDeep(items);
            return (
                <table>
                    {itemsCopy.sort(compare).map(genre => {
                        const hasBooks =
                            content.books.findIndex(
                                book =>
                                    book.genre.toLowerCase() ===
                                    genre.name.toLowerCase()
                            ) !== -1;

                        const booksCopy = cloneDeep(content.books);
                        return (
                            <tbody key={`${genre.name}section`}>
                                {hasBooks && (
                                    <tr>
                                        <th className={style.genreTitle}>
                                            {genre.name}
                                        </th>
                                    </tr>
                                )}
                                {booksCopy
                                    .sort(compare)
                                    .filter(
                                        item =>
                                            item.genre.toLowerCase() ===
                                            genre.name.toLowerCase()
                                    )
                                    .map(book => {
                                        return (
                                            <tr key={`${book.title}row`}>
                                                <td key={book.title}>
                                                    {book.title}
                                                </td>
                                                <td
                                                    className={style.bookPrice}
                                                    key={
                                                        book.title + book.price
                                                    }
                                                >
                                                    {book.price} {book.currency}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        );
                    })}
                </table>
            );
        }
    };

    return render[category](content[category]);
};

export default ViewList;

ViewList.propTypes = {
    category: PropTypes.string,
    content: PropTypes.object
};
