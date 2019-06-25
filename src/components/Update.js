import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems, updateItemData } from '../actions/items';
import style from './Delete.scss';

const Update = props => {
    const { match, booksLoading, books } = props;
    const cloneBooks = books.slice(0);
    const { params } = match;
    const { category } = params;
    const [itemValues, setItemValues] = useState(cloneBooks || []);

    useEffect(() => {
        props.fetchItems(category);
    }, []);

    const handleInputChange = event => {
        const [field, id] = event.target.id.split('-');
        const itemToUpdate = itemValues.findIndex(item => item.id === id);
        const newValues = itemValues.splice(0);
        newValues[itemToUpdate][field] = event.target.value;
        setItemValues(newValues);
    };

    const handleUpdateItem = event => {
        const { id } = event.target;
        const itemToUpdate = itemValues.find(
            item => Number(item.id) === Number(id)
        );
        props.updateItem(category, itemToUpdate);
    };

    return (
        <div className={style.deleteContainer}>
            <h2 className={style.deleteHeader}>Update {category}</h2>
            {booksLoading ? (
                <div>Loading...</div>
            ) : (
                <table cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Update: </th>
                            <th>Title: </th>
                            <th>Genre: </th>
                            <th>Price: </th>
                            <th>Currency: </th>
                        </tr>
                        {itemValues.map((book, index) => (
                            <tr key={`${index}row`}>
                                <td>
                                    <button
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
                                        <option value="mystery">Mystery</option>
                                        <option value="romance">Romance</option>
                                        <option value="horror">Horror</option>
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
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        books: state.items.booksList,
        booksLoading: state.items.booksLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: category => dispatch(fetchItems(category)),
        updateItem: (category, id) => dispatch(updateItemData(category, id))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Update)
);

Update.propTypes = {
    booksLoading: PropTypes.bool,
    books: PropTypes.array,
    fetchItems: PropTypes.func,
    updateItem: PropTypes.func,
    match: PropTypes.object
};
