import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import INITIAL_BOOKS from '../../src/data/initialBooks.json';
import INITIAL_GENRES from '../../src/data/initialGenres.json';
import { fetchItems } from '../../src/actions/items';
import Delete from '../../src/components/Delete';
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

describe('shows list of books to delete', () => {
    beforeAll(async done => {
        defaultProps.match = { params: { category: 'books' } };
        wrapper = mount(
            <Provider store={store} initialState={initialState}>
                <BrowserRouter>
                    <Delete.WrappedComponent {...defaultProps} />
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

    it('includes 3 delete buttons', () => {
        expect(wrapper.find('button').length).toEqual(3);
        expect(wrapper.find('button').first().text()).toContain('X');
    });

    it('includes the three initial book names', () => {
        const text = wrapper.find('table').text();
        expect(text).toContain(initialBooks[0].title);
        expect(text).toContain(initialBooks[1].title);
        expect(text).toContain(initialBooks[2].title);
    });
});

describe('shows list of genres to delete', () => {
    beforeAll(async done => {
        defaultProps.match = { params: { category: 'genres' } };
        wrapper = mount(
            <Provider store={store} initialState={initialState}>
                <BrowserRouter>
                    <Delete.WrappedComponent {...defaultProps} />
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

    it('includes five rows (one header and four genres)', () => {
        expect(wrapper.find('tr').length).toEqual(5);
    });

    it('includes 4 delete buttons', () => {
        expect(wrapper.find('button').length).toEqual(4);
        expect(wrapper.find('button').first().text()).toContain('X');
    });

    it('includes the initial genres', () => {
        const text = wrapper.find('table').text();
        expect(text).toContain(initialGenres[0].name);
        expect(text).toContain(initialGenres[1].name);
        expect(text).toContain(initialGenres[2].name);
    });
});