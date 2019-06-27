import items from '../../src/reducers/items';
import INITIAL_BOOKS from '../../src/data/initialBooks.json';
import INITIAL_GENRES from '../../src/data/initialGenres.json';
import {
    SET_BOOKS,
    BOOKS_LOADING,
    SET_GENRES,
    GENRES_LOADING,
    CREATE_BOOK,
    CREATE_GENRE,
    UPDATE_GENRE,
    UPDATE_BOOK,
    DELETE_BOOK,
    DELETE_GENRE
} from '../../src/actions/types';

const initialBooks = INITIAL_BOOKS.books;
const initialGenres = INITIAL_GENRES.genres;

const initialState = {
    books: initialBooks,
    booksLoading: false,
    genres: initialGenres,
    genresLoading: false
};

describe('items loading', () => {
    it('should set books loading', async () => {
        const category = 'books';
        const action = {
            type: BOOKS_LOADING,
            category,
            payload: true
        };

        const nextState = await items(initialState, action);
        expect(nextState[`${category}Loading`]).toEqual(true);
        expect(nextState[`${category}`]).toEqual(initialBooks);
    });

    it('should set genres loading', async () => {
        const category = 'genres';
        const action = {
            type: GENRES_LOADING,
            category,
            payload: true
        };
        const nextState = await items(initialState, action);
        expect(nextState[`${category}Loading`]).toEqual(true);
        expect(nextState[`${category}`]).toEqual(initialGenres);
    });
});

describe('items set', () => {
    it('should set books', async () => {
        const category = 'books';
        const action = {
            type: SET_BOOKS,
            category,
            payload: null
        };

        const nextState = await items(initialState, action);
        expect(nextState[`${category}Loading`]).toEqual(false);
        expect(nextState[`${category}`]).toEqual(initialBooks);
    });

    it('should set genres', async () => {
        const category = 'genres';
        const action = {
            type: SET_GENRES,
            category,
            payload: null
        };

        const nextState = await items(initialState, action);
        expect(nextState[`${category}Loading`]).toEqual(false);
        expect(nextState[`${category}`]).toEqual(initialGenres);
    });
});

describe('create item', () => {
    it('should create a book', () => {
        const category = 'books';
        const newBook = {
            title: 'Robot',
            genre: 'Science Fiction',
            price: 7,
            currency: 'eur'
        };
        const action = {
            type: CREATE_BOOK,
            category,
            payload: newBook
        };

        const newBooks = [...initialBooks, { ...newBook, id: '4' }];

        const nextState = items(initialState, action);
        expect(nextState[`${category}`]).toEqual(newBooks);
    });

    it('should create a genre', () => {
        const category = 'genres';
        const newGenre = {
            genreName: 'Supernatural'
        };
        const expectedGenre = {
            id: '5',
            name: 'Supernatural',
            nameId: 'supernatural'
        };
        const action = {
            type: CREATE_GENRE,
            category,
            payload: newGenre
        };

        const newGenres = [...initialGenres, expectedGenre];

        const nextState = items(initialState, action);
        expect(nextState[`${category}`]).toEqual(newGenres);
    });
});

describe('delete item', () => {
    it('should delete a book', () => {
        const category = 'books';
        const bookId = '1';
        const action = {
            type: DELETE_BOOK,
            category,
            payload: bookId
        };
        const indexToRemove = initialBooks.findIndex(
            book => String(book.id) === String(bookId)
        );
        const newBooks = [...initialBooks];
        newBooks.splice(indexToRemove, 1);

        const nextState = items(initialState, action);
        expect(nextState[`${category}`]).toEqual(newBooks);
    });

    it('should delete a genre', () => {
        const category = 'genres';
        const genreId = '1';
        const action = {
            type: DELETE_GENRE,
            category,
            payload: genreId
        };

        const indexToRemove = initialGenres.findIndex(
            genre => String(genre.id) === String(genreId)
        );
        const newGenres = [...initialGenres];
        newGenres.splice(indexToRemove, 1);

        const nextState = items(initialState, action);
        expect(nextState[`${category}`]).toEqual(newGenres);
    });
});

describe('update item', () => {
    it('should update a book', () => {
        const category = 'books';
        const newBook = {
            id: '1',
            title: '1984',
            genre: 'Science Fiction',
            price: 20,
            currency: 'usd'
        };
        const action = {
            type: UPDATE_BOOK,
            category,
            payload: newBook
        };
        const indexToUpdate = initialBooks.findIndex(
            book => String(book.id) === String(newBook.id)
        );
        const newBooks = [...initialBooks];
        newBooks[indexToUpdate] = newBook;

        const nextState = items(initialState, action);
        expect(nextState[`${category}`]).toEqual(newBooks);
    });

    it('should update a genre', () => {
        const category = 'genres';
        const newGenre = {
            id: '1',
            name: 'Sci Fi',
            nameId: 'sciFi'
        };
        const action = {
            type: UPDATE_GENRE,
            category,
            payload: newGenre
        };
        const indexToUpdate = initialGenres.findIndex(
            book => String(book.id) === String(newGenre.id)
        );
        const newGenres = [...initialGenres];
        newGenres[indexToUpdate] = newGenre;

        const nextState = items(initialState, action);
        expect(nextState[`${category}`]).toEqual(newGenres);
    });
});
