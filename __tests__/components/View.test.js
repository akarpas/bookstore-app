import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { fetchItems } from '../../src/actions/items';
import View from '../../src/components/View';
import createStore from '../../src/store';

import INITIAL_BOOKS from '../../src/data/initialBooks.json';
import INITIAL_GENRES from '../../src/data/initialGenres.json';

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

describe('handles view books', () => {
    beforeAll(async done => {
        defaultProps.match = { params: { category: 'books' } };
        wrapper = mount(
            <Provider store={store} initialState={initialState}>
                <BrowserRouter>
                    <View.WrappedComponent {...defaultProps} />
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
        expect(wrapper.find('h2').text()).toContain('books');
    });

    it('includes a table', () => {
        expect(wrapper.find('table').length).toEqual(1);
    });

    it('includes four rows (header and three items)', () => {
        expect(wrapper.find('tr').length).toEqual(4);
    });

    it('includes the three initial book names', () => {
        const text = wrapper.find('table').text();
        expect(text).toContain(initialBooks[0].title);
        expect(text).toContain(initialBooks[1].title);
        expect(text).toContain(initialBooks[2].title);
    });
});

describe('handles view genres', () => {
    beforeAll(async done => {
        defaultProps.match = { params: { category: 'genres' } };
        wrapper = mount(
            <Provider store={store} initialState={initialState}>
                <BrowserRouter>
                    <View.WrappedComponent {...defaultProps} />
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
        expect(wrapper.find('h2').text()).toContain('genres');
    });

    it('includes a table', () => {
        expect(wrapper.find('table').length).toEqual(1);
    });

    it('includes five rows (two headers and three books)', () => {
        expect(wrapper.find('tr').length).toEqual(5);
    });

    it('includes the three initial book names', () => {
        const text = wrapper.find('table').text();
        expect(text).toContain(initialBooks[0].title);
        expect(text).toContain(initialBooks[1].title);
        expect(text).toContain(initialBooks[2].title);
    });

    it('includes the genres of the books', () => {
        const text = wrapper.find('table').text();
        expect(text).toContain(initialBooks[0].genre);
        expect(text).toContain(initialBooks[1].genre);
        expect(text).toContain(initialBooks[2].genre);
    });
});