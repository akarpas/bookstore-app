import {
    SET_BOOKS,
    BOOKS_LOADING,
    DELETE_BOOK,
    CREATE_BOOK
} from '../actions/types';
import initialBooks from '../data/initialBooks.json';

const INITIAL_STATE = {
    booksList: initialBooks.books,
    booksLoading: false
};

export const setBooks = state => {
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

const createBook = (state, payload) => {
    const currentBooks = state.booksList.slice(0);
    const bookIds = currentBooks.map(book => book.id);
    const lastId = Math.max.apply(null, bookIds);
    currentBooks.push({ ...payload, id: lastId + 1 });
    return { ...state, booksList: currentBooks };
};

export function books(state = INITIAL_STATE, action) {
    switch (action.type) {
    case SET_BOOKS:
        return setBooks(state);
    case BOOKS_LOADING:
        return setBooksLoading(state);
    case DELETE_BOOK:
        return deleteBook(state, action.payload);
    case CREATE_BOOK:
        return createBook(state, action.payload);
    default:
        return state;
    }
}
