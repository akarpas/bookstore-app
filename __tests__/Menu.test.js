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

it('contains two buttons', () => {
    expect(wrapper.find('button').length).toEqual(2);
});

it('contains a Books button', () => {
    expect(wrapper.find('#books').text()).toEqual('Books');
});

it('contains a Genres button', () => {
    expect(wrapper.find('#genres').text()).toEqual('Genres');
});

it('reveals submenu on Books button click', () => {
    wrapper.find('#books').simulate('click');
    wrapper.update();
    expect(wrapper.find('.subMenu').length).toEqual(1);
    expect(wrapper.find('a').length).toEqual(4);
});

it('reveals submenu on Genres button click', () => {
    wrapper.find('#genres').simulate('click');
    wrapper.update();
    expect(wrapper.find('.subMenu').length).toEqual(1);
    expect(wrapper.find('a').length).toEqual(4);
});