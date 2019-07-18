import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import { compare } from '../../utils/compare';
import { hasNoResults } from '../../utils/hasNoResults';
import NoResults from '../NoResults';

import style from './index.scss';

const ViewList = props => {
    const { category, content } = props;
    const [searchInput, setSearchInput] = useState('');

    const handleChange = event => {
        setSearchInput(event.target.value);
    };

    const render = {
        books: items => {
            const itemsCopy = cloneDeep(items);
            const itemsToRender = itemsCopy.filter(book => {
                if (searchInput.length === 0) return book;
                return book.title
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            const noItems = hasNoResults(itemsToRender);
            return (
                <div className={style.bookListContainer}>
                    <input
                        name="search"
                        type="text"
                        onChange={event => handleChange(event)}
                        placeholder="Search by title"
                        className={style.searchInput}
                    />
                    <table>
                        <tbody>
                            <tr>
                                <th>Title: </th>
                                <th className={style.bookGenre}>Genre: </th>
                                <th className={style.bookPrice}>Price: </th>
                            </tr>
                            {itemsToRender.map((book, index) => (
                                <tr key={`${book.title + index}row`}>
                                    <td key={book.title + index}>
                                        {book.title}
                                    </td>
                                    <td
                                        className={style.bookGenre}
                                        key={book.title + book.genre + index}
                                    >
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
            const itemsCopy = cloneDeep(items);
            const noItems = hasNoResults(itemsCopy);
            return (
                <div className={style.genreListContainer}>
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
                                                        className={
                                                            style.bookPrice
                                                        }
                                                        key={
                                                            book.title +
                                                            book.price
                                                        }
                                                    >
                                                        {book.price}{' '}
                                                        {book.currency}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            );
                        })}
                    </table>
                    {noItems && <NoResults />}
                </div>
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
