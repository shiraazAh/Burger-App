import React from 'react'
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import {BurgerBuilder} from './BurgerBuilder'

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    
    let wrapper;

    beforeEach(() => {
            wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
    })


    it('Should render <BuildControls /> while receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

})
