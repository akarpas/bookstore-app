import {
    SET_BOOKS,
    BOOKS_LOADING,
    DELETE_BOOK,
    UPDATE_BOOK,
    CREATE_BOOK
} from '../actions/types';
import initialBooks from '../data/initialBooks.json';

const INITIAL_STATE = {
    booksList: initialBooks.books,
    booksLoading: false
};

const setBooks = state => {
    return { ...state, booksLoading: false };
};

const setBooksLoading = state => {
    return { ...state, booksLoading: true };
};

const deleteBook = (state, payload) => {
    const currentBooks = state.booksList.slice(0);
    const newBooks = currentBooks.filter(book =>
        Number(book.id) !== Number(payload)
    );
    return { ...state, booksList: newBooks };
};

const updateBook = (state, payload) => {
    const { id } = payload;
    const currentBooks = state.booksList.slice(0);
    const index = currentBooks.findIndex((book => Number(book.id) === Number(id)));
    currentBooks[index] = payload;
    return { ...state, booksList: currentBooks };
};

const createBook = (state, payload) => {
    const currentBooks = state.booksList.slice(0);
    const bookIds = currentBooks.map(book => book.id);
    const lastId = Math.max.apply(null, bookIds);
    currentBooks.push({ ...payload, id: String(lastId + 1) });
    return { ...state, booksList: currentBooks };
};

export function books(state = INITIAL_STATE, action) { // eslint-disable-line
    switch (action.type) {
    case SET_BOOKS:
        return setBooks(state);
    case BOOKS_LOADING:
        return setBooksLoading(state);
    case DELETE_BOOK:
        return deleteBook(state, action.payload);
    case UPDATE_BOOK:
        return updateBook(state, action.payload);
    case CREATE_BOOK:
        return createBook(state, action.payload);
    default:
        return state;
    }
}

