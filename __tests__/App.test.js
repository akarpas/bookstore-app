import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/components/App';
import Header from '../src/components/Header';
import Content from '../src/components/Content';

let wrapper;

beforeEach(() => {
    wrapper = mount(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
});

afterEach(() => {
    wrapper.unmount();
});

it('renders without crashing', () => {
    wrapper.render();
});

it('contains a header component', () => {
    expect(wrapper.find(Header).length).toEqual(1);
});

it('contains a content component', () => {
    expect(wrapper.find(Content).length).toEqual(1);
});