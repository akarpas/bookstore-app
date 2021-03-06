import toCamelCase from 'to-camel-case';
import capitalize from 'capitalize';
import cloneDeep from 'lodash.clonedeep';
import { compare } from '../utils/compare';
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

const BOOKS = 'books';

const INITIAL_STATE = {
    books: initialBooks.books,
    booksLoading: false,
    genres: initialGenres.genres,
    genresLoading: false
};

const setItems = (state, category) => {
    const items = cloneDeep(state[category]);
    const sortedItems = items.sort(compare);
    return { ...state, [category]: sortedItems, [`${category}Loading`]: false };
};

const setLoading = (state, category) => {
    return { ...state, [`${category}Loading`]: true };
};

const deleteItem = (state, payload, category) => {
    const { id, deleteBooks } = payload;
    const currentItems = [...state[category]];
    const newItems = cloneDeep(currentItems).filter(
        item => Number(item.id) !== Number(id)
    );
    if (deleteBooks) {
        const currentBooks = [...state[BOOKS]];
        const genreToDelete = currentItems.find(item => item.id === String(id)).name.toLowerCase();
        const newBooks = currentBooks.filter(book => {
            return book.genre.toLowerCase() !== genreToDelete;
        });
        return { ...state, [BOOKS]: newBooks, [category]: newItems };
    }
    return { ...state, [category]: newItems };
};

const updateItem = (state, payload, category) => {
    const { id } = payload;
    const isBooks = category === BOOKS;
    const currentItems = [...state[category]];
    const index = currentItems.findIndex(
        item => Number(item.id) === Number(id)
    );
    currentItems[index] = payload;

    if (isBooks) {
        return { ...state, [category]: currentItems };
    }

    const previousGenre = state.genres.find(
        genre => String(genre.id) === String(id)
    );
    const currentBooks = cloneDeep(state.books);
    const updatedBooks = currentBooks.map(book => {
        if (book.genre.toUpperCase() === previousGenre.name.toUpperCase()) {
            const newBook = book;
            newBook.genre = payload.name;
            return newBook;
        }
        return book;
    });
    return { ...state, books: updatedBooks, [category]: currentItems };
};

const createItem = (state, payload, category) => {
    const isBooks = category === BOOKS;
    const currentItems = [...state[category]];
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
    return { ...state, [category]: currentItems };
};

export default (state = INITIAL_STATE, action) => {
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
export const getBooks = state => state.items.books;
export const getGenres = state => state.items.genres;
