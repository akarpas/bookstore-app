import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/components/App';
import Header from '../src/components/Header';
import Content from '../src/components/Content';

const wrapper = shallow(<App />);

it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
});

it('contains a header component', () => {
    expect(wrapper.find(Header).length).toEqual(1);
});

it('contains a content component', () => {
    expect(wrapper.find(Content).length).toEqual(1);
});