import {
    SET_BOOKS,
    BOOKS_LOADING,
    CREATE_BOOK
} from './types';

const delay = ms => new Promise(res => setTimeout(res, ms));

export const booksLoading = isLoading => {
    return {
        type: BOOKS_LOADING,
        payload: isLoading
    };
};

export const setBooks = () => {
    return {
        type: SET_BOOKS,
        payload: null
    };
};

export const fetchItems = () => {
    return async dispatch => {
        dispatch(booksLoading(true));
        await delay(2000);
        dispatch(setBooks());
    };
};

export const createBook = book => {
    return {
        type: CREATE_BOOK,
        payload: book
    };
};

export const createItem = (type, item) => {
    return dispatch => {
        dispatch(createBook(item));
    };
};
