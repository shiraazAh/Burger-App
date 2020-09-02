import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Buttons/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {

    return(
        <div className={classes.CheckoutSummary}>
            <h1> Hope It Tastes Good! </h1>
            <div style={{width: '100%', margin: 'auto'}} >
                <Burger ingredients={props.ingredients}/>
                <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary