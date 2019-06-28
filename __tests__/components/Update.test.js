import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import INITIAL_BOOKS from '../../src/data/initialBooks.json';
import INITIAL_GENRES from '../../src/data/initialGenres.json';
import { fetchItems } from '../../src/actions/items';
import Update from '../../src/components/Update';
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

describe('shows update books list', () => {
    beforeAll(async done => {
        defaultProps.match = { params: { category: 'books' } };
        wrapper = mount(
            <Provider store={store} initialState={initialState}>
                <BrowserRouter>
                    <Update.WrappedComponent {...defaultProps} />
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
        expect(wrapper.find('h2').text()).toContain('Update books');
    });

    it('includes three forms (1 for each book', () => {
        expect(wrapper.find('form').length).toEqual(3);
    });

    it('includes 6 inputs and 6 selects (2 for each book)', () => {
        expect(wrapper.find('input').length).toEqual(6);
        expect(wrapper.find('select').length).toEqual(6);
    });

    it('includes the three initial book names', () => {
        const bookIndexes = [1, 2, 3];

        bookIndexes.map(bookIndex =>
            expect(wrapper.find(`#title-${bookIndex}`).props().value).toEqual(
                initialBooks[bookIndex - 1].title
            )
        );
    });

    it('updates form input correctly', () => {
        const inputId = '#title-1';
        const input = wrapper.find(inputId);
        input.simulate('change', { target: { value: 'Test', id: 'title-1' } });
        wrapper.update();
        expect(wrapper.find(inputId).props().value).toEqual('Test');
    });

    it('changes button color on input change', () => {
        const input = wrapper.find('input').first();
        input.simulate('change', { target: { value: 'Test', id: `${input.prop('id')}` } });
        wrapper.update();
        expect(
            wrapper
                .find('button')
                .first()
                .hasClass('buttonUpdate')
        ).toEqual(true);
    });
});

describe('shows update genres list', () => {
    beforeAll(async done => {
        defaultProps.match = { params: { category: 'genres' } };
        wrapper = mount(
            <Provider store={store} initialState={initialState}>
                <BrowserRouter>
                    <Update.WrappedComponent {...defaultProps} />
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
        expect(wrapper.find('h2').text()).toContain('Update genres');
    });

    it('includes four forms (1 for each genre)', () => {
        expect(wrapper.find('form').length).toEqual(4);
    });

    it('includes 4 inputs (1 for each genre)', () => {
        expect(wrapper.find('input').length).toEqual(4);
    });

    it('includes the four initial genre names', () => {
        const genreIndexes = [1, 2, 3, 4];

        genreIndexes.map(genreIndex =>
            expect(wrapper.find(`#name-${genreIndex}`).props().value).toEqual(
                initialGenres[genreIndex - 1].name
            )
        );
    });

    it('updates form input correctly', () => {
        const inputId = '#name-1';
        const input = wrapper.find(inputId);
        input.simulate('change', { target: { value: 'Test', id: 'name-1' } });
        wrapper.update();
        expect(wrapper.find(inputId).props().value).toEqual('Test');
    });

    it('changes button color on input change', () => {
        const input = wrapper.find('input').first();
        input.simulate('change', { target: { value: 'Test', id: `${input.prop('id')}` } });
        wrapper.update();
        expect(
            wrapper
                .find('button')
                .first()
                .hasClass('buttonUpdate')
        ).toEqual(true);
    });
});
