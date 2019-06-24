import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems, deleteItem } from '../actions/items';
import style from './Delete.scss';

const Delete = props => {
    const { match, books, booksLoading } = props;
    const { params } = match;
    const { category } = params;
    useEffect(() => {
        props.fetchItems(category);
    }, []);

    const deleteBook = event => {
        const { id } = event.target;
        props.deleteItem(category, Number(id));
        props.fetchItems(category);
    };

    return (
        <div className={style.deleteContainer}>
            <h2 className={style.deleteHeader}>Delete {category}</h2>
            {booksLoading ? (
                <div>Loading...</div>
            ) : (
                <table cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Delete: </th>
                            <th>Title: </th>
                            <th>Genre: </th>
                            <th>Price: </th>
                        </tr>
                        {books.map(book => (
                            <tr key={`${book.title}row`}>
                                <td>
                                    <button
                                        onClick={deleteBook}
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
        fetchItems: category => dispatch(fetchItems(category)),
        deleteItem: (category, id) => dispatch(deleteItem(category, id))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Delete)
);

Delete.propTypes = {
    booksLoading: PropTypes.bool,
    books: PropTypes.array,
    fetchItems: PropTypes.func,
    deleteItem: PropTypes.func,
    match: PropTypes.object
};
