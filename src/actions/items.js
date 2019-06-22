import {
    SET_BOOKS,
    BOOKS_LOADING
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
