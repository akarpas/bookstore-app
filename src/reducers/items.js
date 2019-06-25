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

const setBooks = state => {
    return { ...state, booksLoading: false };
};

const setBooksLoading = state => {
    return { ...state, booksLoading: true };
};

const setGenres = state => {
    return { ...state, genresLoading: false };
};

const setGenresLoading = state => {
    return { ...state, genresLoading: true };
};

const deleteBook = (state, payload) => {
    const currentBooks = state.booksList.slice(0);
    const newBooks = currentBooks.filter(book =>
        Number(book.id) !== Number(payload)
    );
    return { ...state, booksList: newBooks };
};

const deleteGenre = (state, payload) => {
    const currentGenres = state.genresList.slice(0);
    const newGenres = currentGenres.filter(genre =>
        Number(genre.id) !== Number(payload)
    );
    return { ...state, genresList: newGenres };
};

const updateBook = (state, payload) => {
    const { id } = payload;
    const currentBooks = state.booksList.slice(0);
    const index = currentBooks.findIndex((book => Number(book.id) === Number(id)));
    currentBooks[index] = payload;
    return { ...state, booksList: currentBooks };
};

const updateGenre = (state, payload) => {
    const { id } = payload;
    const currentGenres = state.genresList.slice(0);
    const index = currentGenres.findIndex((genre => Number(genre.id) === Number(id)));
    currentGenres[index] = payload;
    return { ...state, genresList: currentGenres };
};

const createBook = (state, payload) => {
    const currentBooks = state.booksList.slice(0);
    const bookIds = currentBooks.map(book => book.id);
    const lastId = Math.max.apply(null, bookIds);
    currentBooks.push({ ...payload, id: String(lastId + 1) });
    return { ...state, booksList: currentBooks };
};

const createGenre = (state, payload) => {
    const currentGenres = state.genresList.slice(0);
    const genreIds = currentGenres.map(genre => genre.id);
    const lastId = Math.max.apply(null, genreIds);
    currentGenres.push({ ...payload, name: payload.genreName, id: String(lastId + 1) });
    return { ...state, genresList: currentGenres };
};

export function items(state = INITIAL_STATE, action) { // eslint-disable-line
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
    case SET_GENRES:
        return setGenres(state);
    case GENRES_LOADING:
        return setGenresLoading(state);
    case CREATE_GENRE:
        return createGenre(state, action.payload);
    case DELETE_GENRE:
        return deleteGenre(state, action.payload);
    case UPDATE_GENRE:
        return updateGenre(state, action.payload);
    default:
        return state;
    }
}
