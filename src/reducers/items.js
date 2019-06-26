import toCamelCase from 'to-camel-case';
import capitalize from 'capitalize';

import {
    SET_BOOKS,
    BOOKS_LOADING,
    DELETE_BOOK,
    UPDATE_BOOK,
    CREATE_BOOK,
    SET_GENRES,
    GENRES_LOADING,
    DELETE_GENRE,
    CREATE_GENRE,
    UPDATE_GENRE
} from '../actions/types';
import initialBooks from '../data/initialBooks.json';
import initialGenres from '../data/initialGenres.json';

const INITIAL_STATE = {
    booksList: initialBooks.books,
    booksLoading: false,
    genresList: initialGenres.genres,
    genresLoading: false
};

const setItems = (state, category) => {
    return { ...state, [`${category}Loading`]: false };
};

const setLoading = (state, category) => {
    return { ...state, [`${category}Loading`]: true };
};

const deleteItem = (state, payload, category) => {
    const list = `${category}List`;
    const currentItems = state[list].slice(0);
    const newItems = currentItems.filter(
        item => Number(item.id) !== Number(payload)
    );
    return { ...state, [list]: newItems };
};

const updateItem = (state, payload, category) => {
    const list = `${category}List`;
    const { id } = payload;
    const currentItems = state[list].slice(0);
    const index = currentItems.findIndex(
        item => Number(item.id) === Number(id)
    );
    currentItems[index] = payload;
    return { ...state, [list]: currentItems };
};

const createItem = (state, payload, category) => {
    const list = `${category}List`;
    const isBooks = category === 'books';
    const currentItems = state[list].slice(0);
    const itemIds = currentItems.map(item => item.id);
    const lastId = Math.max.apply(null, itemIds);
    currentItems.push(
        isBooks
            ? { ...payload, id: String(lastId + 1) }
            : {
                nameId: toCamelCase(payload.genreName),
                name: capitalize.words(payload.genreName),
                id: String(lastId + 1)
            }
    );
    return { ...state, [list]: currentItems };
};

export default (state = INITIAL_STATE, action) => {
    // eslint-disable-line
    switch (action.type) {
        case SET_BOOKS:
        case SET_GENRES:
            return setItems(state, action.category);
        case BOOKS_LOADING:
        case GENRES_LOADING:
            return setLoading(state, action.category);
        case DELETE_BOOK:
        case DELETE_GENRE:
            return deleteItem(state, action.payload, action.category);
        case UPDATE_BOOK:
        case UPDATE_GENRE:
            return updateItem(state, action.payload, action.category);
        case CREATE_BOOK:
        case CREATE_GENRE:
            return createItem(state, action.payload, action.category);
        default:
            return state;
    }
};

export const getBooksLoading = state => state.items.booksLoading;
export const getGenresLoading = state => state.items.genresLoading;
export const getBooks = state => state.items.booksList;
export const getGenres = state => state.items.genresList;
