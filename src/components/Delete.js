import React, { useLayoutEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    getBooksLoading, getGenresLoading, getBooks, getGenres
} from '../reducers/items';
import { fetchItems, deleteItem } from '../actions/items';
import DeleteList from './DeleteList';
import Layout from './Layout';

const BOOKS = 'books';

const Delete = props => {
    const { match, books, booksLoading, genres, genresLoading } = props;
    const { params } = match;
    const { category } = params;
    const [isDeleteBooks, setIsDeleteBooks] = useState({});
    const isBooks = category === BOOKS;

    useLayoutEffect(() => {
        props.fetchItems(category);
    }, []);

    useLayoutEffect(() => {
        props.fetchItems(category);
    }, [category]);

    const handleDeleteItem = event => {
        const { id } = event.target;
        const deleteBooks = isDeleteBooks[id] || false;
        props.deleteItem(category, Number(id), deleteBooks);
        props.fetchItems(category);
    };

    const handleCheckBox = event => {
        const { id } = event.target;
        setIsDeleteBooks({ ...isDeleteBooks, [id]: !isDeleteBooks[id] });
    };
    const itemsLoading = isBooks ? booksLoading : genresLoading;

    const content = {
        books,
        genres
    };

    return (
        <Layout title={`Delete ${category}`}>
            {itemsLoading ? <div>Loading...</div>
                : <DeleteList
                    content={content}
                    handleDeleteItem={handleDeleteItem}
                    category={category}
                    handleCheckBox={handleCheckBox}
                />
            }
        </Layout>
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
        deleteItem: (category, id, deleteBooks) => dispatch(deleteItem(category, id, deleteBooks))
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
