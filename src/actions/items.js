import {
    SET_BOOKS,
    BOOKS_LOADING,
    DELETE_BOOK,
    UPDATE_BOOK,
    CREATE_BOOK,
    GENRES_LOADING,
    SET_GENRES,
    CREATE_GENRE,
    DELETE_GENRE,
    UPDATE_GENRE
} from './types';

const delay = ms => new Promise(res => setTimeout(res, ms));

export const booksLoading = isLoading => {
    return {
        type: BOOKS_LOADING,
        payload: isLoading
    };
};

export const genresLoading = isLoading => {
    return {
        type: GENRES_LOADING,
        payload: isLoading
    };
};

export const setBooks = () => {
    return {
        type: SET_BOOKS,
        payload: null
    };
};

export const setGenres = () => {
    return {
        type: SET_GENRES,
        payload: null
    };
};

export const fetchItems = category => {
    return category === 'books' ? async dispatch => {
        dispatch(booksLoading(true));
        await delay(1000);
        dispatch(setBooks());
    } : async dispatch => {
        dispatch(genresLoading(true));
        await delay(1000);
        dispatch(setGenres());
    };
};

export const createBook = book => {
    return {
        type: CREATE_BOOK,
        payload: book
    };
};

export const createGenre = book => {
    return {
        type: CREATE_GENRE,
        payload: book
    };
};

export const deleteBook = bookId => {
    return {
        type: DELETE_BOOK,
        payload: bookId
    };
};

export const deleteGenre = genreId => {
    return {
        type: DELETE_GENRE,
        payload: genreId
    };
};

export const updateBook = item => {
    return {
        type: UPDATE_BOOK,
        payload: item
    };
};

export const updateGenre = item => {
    return {
        type: UPDATE_GENRE,
        payload: item
    };
};

export const createItem = (category, item) => {
    return category === 'books' ? dispatch => {
        dispatch(createBook(item));
    } : dispatch => {
        dispatch(createGenre(item));
    };
};

export const deleteItem = (category, itemId) => {
    return category === 'books' ? dispatch => {
        dispatch(deleteBook(itemId));
    } : dispatch => {
        dispatch(deleteGenre(itemId));
    };
};

export const updateItemData = (category, item) => {
    return category === 'books' ? dispatch => {
        dispatch(updateBook(item));
    } : dispatch => {
        dispatch(updateGenre(item));
    };
};
