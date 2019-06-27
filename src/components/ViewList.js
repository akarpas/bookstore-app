import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import { compare } from '../utils/compare';
import style from './ViewList.scss';

const ViewList = props => {
    const { category, content } = props;

    const render = {
        books: items => {
            const itemsCopy = cloneDeep(items);
            return (
                <table>
                    <tbody>
                        <tr>
                            <th>Title: </th>
                            <th>Genre: </th>
                            <th>Price: </th>
                        </tr>
                        {itemsCopy.sort(compare).map(book => (
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
            );
        },
        genres: items => {
            const itemsCopy = cloneDeep(items);
            return (
                <table>
                    {itemsCopy.sort(compare).map(genre => {
                        const hasBooks =
                            content.books.findIndex(
                                book => book.genre === genre.name
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
