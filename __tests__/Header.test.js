import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Header from '../src/components/Header';
import Menu from '../src/components/Menu';
import Logo from '../src/components/Logo';

let wrapper;

beforeEach(() => {
    wrapper = mount(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
});

afterEach(() => {
    wrapper.unmount();
});

it('renders without crashing', () => {
    wrapper.render();
});

it('contains a logo component', () => {
    expect(wrapper.find(Logo).length).toEqual(1);
});

it('contains a menu component', () => {
    expect(wrapper.find(Menu).length).toEqual(1);
});