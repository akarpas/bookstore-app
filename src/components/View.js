import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems } from '../actions/items';
import style from './View.scss';

const View = props => {
    const [items, setItems] = useState([]);
    const { match, books, booksLoading } = props;
    const { params } = match;
    const { category } = params;
    const isBooks = category === 'books';

    useEffect(() => {
        props.fetchItems(category);
        setItems(isBooks ? books : []);
    }, []);

    useEffect(() => {
        props.fetchItems(category);
    }, [category]);

    const itemsLoading = isBooks ? booksLoading : [];

    return (
        <div className={style.viewContainer}>
            <h2 className={style.viewHeader}>List of {category}</h2>
            {itemsLoading ? (
                <div>Loading...</div>
            ) : (
                <table cellSpacing="0">
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
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        books: state.books.booksList,
        booksLoading: state.books.booksLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: category => dispatch(fetchItems(category))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(View)
);

View.propTypes = {
    booksLoading: PropTypes.bool,
    books: PropTypes.array,
    fetchItems: PropTypes.func,
    match: PropTypes.object
};
