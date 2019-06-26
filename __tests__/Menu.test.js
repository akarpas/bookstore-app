import React from 'react';
import { shallow } from 'enzyme';
import Menu from '../src/components/Menu';

const wrapper = shallow(<Menu />);

it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
});

describe('basic submenus', () => {
    it('contains 2 submenus', () => {
        expect(wrapper.find('.title').length).toEqual(2);
    });

    it('contains 1 submenu with title Books', () => {
        expect(wrapper.find('.title').first().text()).toContain('Books');
    });

    it('contains 1 submenu with title Genres', () => {
        expect(wrapper.find('.title').last().text()).toContain('Genres');
    });
});

it('contains 8 icons', () => {
    expect(wrapper.find('img').length).toEqual(8);
});
