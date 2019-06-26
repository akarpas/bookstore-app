import React from 'react';
import PropTypes from 'prop-types';

import style from './ViewList.scss';

const ViewList = props => {
    const { category, content } = props;

    const render = {
        books: items => {
            return (
                <table>
                    <tbody>
                        <tr>
                            <th>Title: </th>
                            <th>Genre: </th>
                            <th>Price: </th>
                        </tr>
                        {items.map(book => (
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
            return (
                <table>
                    {items.map(genre => {
                        const hasBooks =
                            content.books.findIndex(
                                book => book.genre === genre.name
                            ) !== -1;

                        return (
                            <tbody key={`${genre.name}section`}>
                                {hasBooks && (
                                    <tr>
                                        <th className={style.genreTitle}>
                                            {genre.name}
                                        </th>
                                    </tr>
                                )}
                                {content.books
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
