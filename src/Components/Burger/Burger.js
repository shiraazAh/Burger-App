import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(igKeys => [...Array(props.ingredients[igKeys])].map((_, i) => 
                                    { return <BurgerIngredient key={igKeys + i} type={igKeys} />} )).reduce((arr, el) =>
                                    {return arr.concat(el)}, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p className={classes.text}>Please Start Adding Ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;