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
                    <tbody>
                        <tr>
                            <th>Genre: </th>
                        </tr>
                        {items.map(genre => (
                            <tr key={`${genre.name}row`}>
                                <td key={genre.name}>{genre.name}</td>
                            </tr>
                        ))}
                    </tbody>
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
