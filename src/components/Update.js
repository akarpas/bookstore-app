import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import { fetchItems, updateItem } from '../actions/items';
import style from './Update.scss';

const Update = props => {
    const { match, booksLoading, books, genres, genresLoading } = props;
    const cloneBooks = cloneDeep(books);
    const cloneGenres = cloneDeep(genres);
    const { params } = match;
    const { category } = params;
    const isBooks = category === 'books';
    const [itemValues, setItemValues] = useState(
        { books: cloneBooks, genres: cloneGenres } || []
    );

    useEffect(() => {
        props.fetchItems(category);
    }, []);

    useEffect(() => {
        props.fetchItems(category);
        setItemValues({ books: cloneBooks, genres: cloneGenres });
    }, [category]);

    const handleInputChange = event => {
        const [field, id] = event.target.id.split('-');
        const itemToUpdate = itemValues[category].findIndex(
            item => item.id === id
        );
        const newValues = itemValues[category].splice(0);
        newValues[itemToUpdate][field] = event.target.value;
        setItemValues({ [category]: newValues });
    };

    const handleUpdateItem = event => {
        const { id } = event.target;
        const itemToUpdate = itemValues[category].find(
            item => Number(item.id) === Number(id)
        );
        props.updateItem(category, itemToUpdate);
    };

    const render = {
        books: content => {
            return (
                <table cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Update: </th>
                            <th>Title: </th>
                            <th>Genre: </th>
                            <th>Price: </th>
                            <th>Currency: </th>
                        </tr>
                        {content.map((book, index) => {
                            const hasUpdates =
                                content[index].title !== books[index].title ||
                                content[index].price !== books[index].price ||
                                content[index].genre !== books[index].genre ||
                                content[index].currency !==
                                    books[index].currency;

                            return (
                                <tr key={`${index}row`}>
                                    <td>
                                        <button
                                            className={
                                                hasUpdates
                                                    ? style.buttonUpdate
                                                    : style.button
                                            }
                                            onClick={handleUpdateItem}
                                            type="button"
                                            id={book.id}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td key={`${index}title`}>
                                        <input
                                            onChange={handleInputChange}
                                            id={`title-${book.id}`}
                                            type="text"
                                            value={book.title}
                                        />
                                    </td>
                                    <td key={`${index}genre`}>
                                        <select
                                            value={book.genre}
                                            onChange={handleInputChange}
                                            id={`genre-${book.id}`}
                                        >
                                            <option value="scienceFiction">
                                                Science Fiction
                                            </option>
                                            <option value="mystery">
                                                Mystery
                                            </option>
                                            <option value="romance">
                                                Romance
                                            </option>
                                            <option value="horror">
                                                Horror
                                            </option>
                                        </select>
                                    </td>
                                    <td key={`${index}price`}>
                                        <input
                                            onChange={handleInputChange}
                                            id={`price-${book.id}`}
                                            type="number"
                                            value={book.price}
                                        />
                                    </td>
                                    <td
                                        className={style.bookPrice}
                                        key={`${index}currency`}
                                    >
                                        <select
                                            value={book.currency}
                                            onChange={handleInputChange}
                                            id={`currency-${book.id}`}
                                        >
                                            <option value="eur">EUR</option>
                                            <option value="usd">USD</option>
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        },
        genres: content => {
            return (
                <table cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Update: </th>
                            <th>Genre: </th>
                        </tr>
                        {content.map((genre, index) => {
                            const hasUpdates =
                                content[index].name !== genres[index].name;
                            return (
                                <tr key={`${index}row`}>
                                    <td>
                                        <button
                                            className={
                                                hasUpdates
                                                    ? style.buttonUpdate
                                                    : style.button
                                            }
                                            onClick={handleUpdateItem}
                                            type="button"
                                            id={genre.id}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td key={`${index}genre`}>
                                        <input
                                            onChange={handleInputChange}
                                            id={`name-${genre.id}`}
                                            type="text"
                                            value={genre.name}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        }
    };

    const itemsLoading = isBooks ? booksLoading : genresLoading;

    return (
        <div className={style.updateContainer}>
            <h2 className={style.updateHeader}>Update {category}</h2>
            {itemsLoading ? (
                <div>Loading...</div>
            ) : (
                itemValues[category] && render[category](itemValues[category])
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
        fetchItems: category => dispatch(fetchItems(category)),
        updateItem: (category, id) => dispatch(updateItem(category, id))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Update)
);

Update.propTypes = {
    genresLoading: PropTypes.bool,
    genres: PropTypes.array,
    booksLoading: PropTypes.bool,
    books: PropTypes.array,
    fetchItems: PropTypes.func,
    updateItem: PropTypes.func,
    match: PropTypes.object
};
