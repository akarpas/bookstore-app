import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../src/components/Logo';

const wrapper = shallow(<Logo />);

it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
});

it('contains 1 icons', () => {
    expect(wrapper.find('img').length).toEqual(1);
});
