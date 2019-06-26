import React, { useLayoutEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import {
    getBooksLoading, getGenresLoading, getBooks, getGenres,
} from '../reducers/items';
import { fetchItems, updateItem } from '../actions/items';
import UpdateForm from './UpdateForm';
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

    useLayoutEffect(() => {
        props.fetchItems(category);
    }, []);

    useLayoutEffect(() => {
        props.fetchItems(category).then(() => {
            setItemValues({ books: cloneBooks, genres: cloneGenres });
        });
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
        event.preventDefault();
        const { id } = event.target;
        const itemToUpdate = itemValues[category].find(
            item => Number(item.id) === Number(id)
        );
        props.updateItem(category, itemToUpdate);
    };

    const itemsLoading = isBooks ? booksLoading : genresLoading;

    return (
        <div className={style.updateContainer}>
            <h2 className={style.updateHeader}>Update {category}</h2>
            {itemsLoading ? (
                <div>Loading...</div>
            ) : (
                itemValues[category] && (
                    <UpdateForm
                        category={category}
                        books={books}
                        genres={genres}
                        handleInputChange={handleInputChange}
                        handleUpdateItem={handleUpdateItem}
                        itemValues={itemValues}
                    />
                )
            )}
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
