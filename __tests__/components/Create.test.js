import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import INITIAL_BOOKS from '../../src/data/initialBooks.json';
import INITIAL_GENRES from '../../src/data/initialGenres.json';
import { fetchItems } from '../../src/actions/items';
import Create from '../../src/components/Create';
import createStore from '../../src/store';

const initialBooks = INITIAL_BOOKS.books;
const initialGenres = INITIAL_GENRES.genres;

let wrapper;

const initialState = {
    books: initialBooks,
    booksLoading: false,
    genres: initialGenres,
    genresLoading: false
};

const defaultProps = {
    fetchItems,
    ...initialState
};

const store = createStore({});

describe('shows create book form', () => {
    beforeAll(async done => {
        defaultProps.match = { params: { category: 'books' } };
        wrapper = mount(
            <Provider store={store} initialState={initialState}>
                <BrowserRouter>
                    <Create.WrappedComponent {...defaultProps} />
                </BrowserRouter>
            </Provider>
        );
        setTimeout(() => {
            wrapper.update();
            done();
        }, 1250);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('includes a header with title', () => {
        expect(wrapper.find('h2').length).toEqual(1);
        expect(wrapper.find('h2').text()).toContain('Create a book');
    });

    it('includes a form', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('includes 2 inputs and 2 selects', () => {
        expect(wrapper.find('input').length).toEqual(2);
        expect(wrapper.find('select').length).toEqual(2);
    });

    it('includes 1 button', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });
});

describe('shows create genre form', () => {
    beforeAll(async done => {
        defaultProps.match = { params: { category: 'genres' } };
        wrapper = mount(
            <Provider store={store} initialState={initialState}>
                <BrowserRouter>
                    <Create.WrappedComponent {...defaultProps} />
                </BrowserRouter>
            </Provider>
        );
        setTimeout(() => {
            wrapper.update();
            done();
        }, 1250);
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('includes a header with title', () => {
        expect(wrapper.find('h2').length).toEqual(1);
        expect(wrapper.find('h2').text()).toContain('Create a genre');
    });

    it('includes a form', () => {
        expect(wrapper.find('form').length).toEqual(1);
    });

    it('includes 1 inputs', () => {
        expect(wrapper.find('input').length).toEqual(1);
    });

    it('includes 1 button', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });
});