import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    getBooksLoading, getGenresLoading, getBooks, getGenres,
} from '../reducers/items';
import { fetchItems, deleteItem } from '../actions/items';
import style from './Delete.scss';

const Delete = props => {
    const { match, books, booksLoading, genres, genresLoading } = props;
    const { params } = match;
    const { category } = params;
    const isBooks = category === 'books';
    useEffect(() => {
        props.fetchItems(category);
    }, []);

    const handleDeleteItem = event => {
        const { id } = event.target;
        props.deleteItem(category, Number(id));
        props.fetchItems(category);
    };

    const render = {
        books: content => {
            return (
                <table cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Delete: </th>
                            <th>Title: </th>
                            <th>Genre: </th>
                            <th>Price: </th>
                        </tr>
                        {content.map(book => (
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
        genres: content => {
            return (
                <table cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Delete: </th>
                            <th>Genre: </th>
                        </tr>
                        {content.map(genre => (
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

    const itemsLoading = isBooks ? booksLoading : genresLoading;

    const content = {
        books,
        genres
    };

    return (
        <div className={style.deleteContainer}>
            <h2 className={style.deleteHeader}>Delete {category}</h2>
            {itemsLoading ? <div>Loading...</div> : render[category](content[category])}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        books: getBooks(state),
        booksLoading: getBooksLoading(state),
        genres: getGenres(state),
        genresLoading: getGenresLoading(state)
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
    genresLoading: PropTypes.bool,
    genres: PropTypes.array,
    booksLoading: PropTypes.bool,
    books: PropTypes.array,
    fetchItems: PropTypes.func,
    deleteItem: PropTypes.func,
    match: PropTypes.object
};
