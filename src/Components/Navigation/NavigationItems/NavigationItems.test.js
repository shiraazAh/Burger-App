import React from 'react'
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should have atleast two navigation items if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should have atleast three navigation items if authenticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });


    it('Should have logout navigation item', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
})
