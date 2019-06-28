import React, { useLayoutEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchItems } from '../actions/items';
import {
    getBooksLoading, getGenresLoading, getBooks, getGenres,
} from '../reducers/items';
import ViewList from './ViewList';
import Layout from './Layout';

const BOOKS = 'books';

const View = props => {
    const { match, books, booksLoading, genres, genresLoading } = props;
    const { params } = match;
    const { category } = params;
    const isBooks = category === BOOKS;

    useLayoutEffect(() => {
        props.fetchItems(category);
    }, []);

    useLayoutEffect(() => {
        props.fetchItems(category);
    }, [category]);

    const content = {
        books,
        genres
    };

    const itemsLoading = isBooks ? booksLoading : genresLoading;

    return (
        <Layout title={`List of ${category}`}>
            {itemsLoading ? (
                <div>Loading...</div>
            ) : (
                <ViewList
                    content={content}
                    category={category}
                />
            )}
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
