import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]

const buildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <div className={classes.tinyBox}>
            <p><strong className={classes.currentPriceBox}>Current Price</strong><span className={classes.moneyBox}>${props.price.toFixed(2)}</span></p>
            </div>
            {controls.map(el => {return <BuildControl 
                key={el.label} 
                label={el.label} 
                added={() => props.ingredientsAdded(el.type)} 
                removed={() => props.ingredientsRemoved(el.type)}
                disabled={props.disabledInfo[el.type]}/>})}    
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.openModal}>
                {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER" }
            </button>
        </div>
    )
}

export default buildControls;