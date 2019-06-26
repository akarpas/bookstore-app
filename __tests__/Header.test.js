import React from 'react';
import { shallow } from 'enzyme';
import Header from '../src/components/Header';
import Menu from '../src/components/Menu';
import Logo from '../src/components/Logo';

const wrapper = shallow(<Header />);

it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
});

it('contains a logo component', () => {
    expect(wrapper.find(Logo).length).toEqual(1);
});

it('contains a menu component', () => {
    expect(wrapper.find(Menu).length).toEqual(1);
});