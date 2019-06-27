import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    fetchItems,
    createItem,
    updateItem,
    deleteItem
} from '../../src/actions/items';
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

const mockStore = configureMockStore([thunk]);
const store = mockStore();
beforeEach(() => {
    store.clearActions();
});

describe('it fetches items', () => {
    it('handles fetching books', async () => {
        const category = 'books';
        await store.dispatch(fetchItems(category));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: BOOKS_LOADING,
            category,
            payload: true
        });
        expect(actions[1]).toEqual({
            type: SET_BOOKS,
            category,
            payload: null
        });
    });

    it('handles fetching genres', async () => {
        const category = 'genres';
        await store.dispatch(fetchItems(category));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: GENRES_LOADING,
            category,
            payload: true
        });
        expect(actions[1]).toEqual({
            type: SET_GENRES,
            category,
            payload: null
        });
    });
});

describe('it creates items', () => {
    it('handles creating a book', async () => {
        const category = 'books';
        const testBook = {};
        await store.dispatch(createItem(category, testBook));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: CREATE_BOOK,
            category,
            payload: testBook
        });
    });

    it('handles creating a genre', async () => {
        const category = 'genres';
        const testGenre = {};
        await store.dispatch(createItem(category, testGenre));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: CREATE_GENRE,
            category,
            payload: testGenre
        });
    });
});

describe('it updates items', () => {
    it('handles updating a book', async () => {
        const category = 'books';
        const testBook = {};
        await store.dispatch(updateItem(category, testBook));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: UPDATE_BOOK,
            category,
            payload: testBook
        });
    });

    it('handles updating a genre', async () => {
        const category = 'genres';
        const testGenre = {};
        await store.dispatch(updateItem(category, testGenre));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: UPDATE_GENRE,
            category,
            payload: testGenre
        });
    });
});

describe('it deletes items', () => {
    const testId = '1';
    it('handles deleting a book', async () => {
        const category = 'books';
        await store.dispatch(deleteItem(category, testId));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: DELETE_BOOK,
            category,
            payload: testId
        });
    });

    it('handles deleting a genre', async () => {
        const category = 'genres';
        await store.dispatch(deleteItem(category, testId));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: DELETE_GENRE,
            category,
            payload: testId
        });
    });
});
