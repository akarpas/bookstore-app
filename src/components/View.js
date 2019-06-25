import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems } from '../actions/items';
import style from './View.scss';

const View = props => {
    const { match, books, booksLoading, genres, genresLoading } = props;
    const { params } = match;
    const { category } = params;
    const isBooks = category === 'books';

    useEffect(() => {
        props.fetchItems(category);
    }, []);

    useEffect(() => {
        props.fetchItems(category);
    }, [category]);

    const render = content => {
        return isBooks ? (
            <tbody>
                <tr>
                    <th>Title: </th>
                    <th>Genre: </th>
                    <th>Price: </th>
                </tr>
                {content.map(book => (
                    <tr key={`${book.title}row`}>
                        <td key={book.title}>{book.title}</td>
                        <td key={book.title + book.genre}>{book.genre}</td>
                        <td
                            className={style.bookPrice}
                            key={book.title + book.price}
                        >
                            {book.price} {book.currency}
                        </td>
                    </tr>
                ))}
            </tbody>
        ) : (
            <tbody>
                <tr>
                    <th>Genre: </th>
                </tr>
                {content.map(genre => (
                    <tr key={`${genre.name}row`}>
                        <td key={genre.name}>{genre.name}</td>
                    </tr>
                ))}
            </tbody>
        );
    };

    const itemsLoading = isBooks ? booksLoading : genresLoading;

    return (
        <div className={style.viewContainer}>
            <h2 className={style.viewHeader}>List of {category}</h2>
            {itemsLoading ? (
                <div>Loading...</div>
            ) : (
                <table>{render(isBooks ? books : genres)}</table>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        books: state.items.booksList,
        booksLoading: state.items.booksLoading,
        genres: state.items.genresList,
        genresLoading: state.items.genresLoading
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
    genresLoading: PropTypes.bool,
    genres: PropTypes.array,
    fetchItems: PropTypes.func,
    match: PropTypes.object
};
