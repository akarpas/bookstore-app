import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    getBooksLoading, getGenresLoading, getBooks, getGenres,
} from '../reducers/items';
import { fetchItems, deleteItem } from '../actions/items';
import DeleteList from './DeleteList';
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

    const itemsLoading = isBooks ? booksLoading : genresLoading;

    const content = {
        books,
        genres
    };

    return (
        <div className={style.deleteContainer}>
            <h2 className={style.deleteHeader}>Delete {category}</h2>
            {itemsLoading ? <div>Loading...</div>
                : <DeleteList
                    content={content}
                    handleDeleteItem={handleDeleteItem}
                    category={category}
                />
            }
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
