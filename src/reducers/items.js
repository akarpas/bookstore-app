import {
    SET_BOOKS,
    BOOKS_LOADING,
} from '../actions/types';
import initialBooks from '../data/initialBooks.json';

const INITIAL_STATE = {
    booksList: [],
    booksLoading: false
};

export const setBooks = state => {
    return { ...state, booksList: initialBooks.books, booksLoading: false };
};

const setBooksLoading = state => {
    return { ...state, booksLoading: true };
};

export function books(state = INITIAL_STATE, action) {
    switch (action.type) {
    case SET_BOOKS:
        return setBooks(state);
    case BOOKS_LOADING:
        return setBooksLoading(state);
    default:
        return state;
    }
}
