import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../src/components/Menu';

let wrapper;

beforeEach(() => {
    wrapper = mount(
        <BrowserRouter>
            <Menu />
        </BrowserRouter>
    );
});

afterEach(() => {
    wrapper.unmount();
});

it('renders without crashing', () => {
    wrapper.render();
});

it('contains two categories divs', () => {
    expect(wrapper.find('.menuCategory').length).toEqual(2);
});

it('contains a Books category div', () => {
    expect(wrapper.find('.menuCategory').first().text()).toEqual('Books');
});

it('contains a Books category div', () => {
    expect(wrapper.find('.menuCategory').last().text()).toEqual('Genres');
});