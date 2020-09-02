import React from 'react';
import classes from './Order.css'

const order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    console.log(ingredients)

    //[{name: cheese, amount: 2}, {name: cheese, amount: 3}]
    const allIngredients = ingredients.map(ingredient => 
        <span key={ingredient.name} 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ingredient.name}({ingredient.amount})</span>)

            console.log(allIngredients);
    return(
        <div className={classes.Order}>
            <p>ingredients : {allIngredients}</p>
            <p>Price : <strong>{Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>
        </div>)
}

export default order;
