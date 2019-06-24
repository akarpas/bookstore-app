import {
    SET_BOOKS,
    BOOKS_LOADING,
    DELETE_BOOK,
    UPDATE_BOOK,
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

export const deleteBook = bookId => {
    return {
        type: DELETE_BOOK,
        payload: bookId
    };
};

export const updateBook = item => {
    return {
        type: UPDATE_BOOK,
        payload: item
    };
};

export const createItem = (type, item) => {
    return dispatch => {
        dispatch(createBook(item));
    };
};

export const deleteItem = (type, itemId) => {
    return dispatch => {
        dispatch(deleteBook(itemId));
    };
};

export const updateItemData = (type, item) => {
    return dispatch => {
        dispatch(updateBook(item));
    };
};
