import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/orderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withError';

import * as actions from '../../store/actions/index.js';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        error: null
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => { return ingredients[igKey] > 0} ).reduce((sum, el) => {
            return sum + el
        }, 0)

        return sum > 0;
    }


    // addIngredients = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + INGREDIENT_PRICE[type];
    //     updatedIngredients[type] = updatedCount

    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchase(updatedIngredients);
    // } 

    // removeIngredients = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0 ) return;
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - INGREDIENT_PRICE[type];
    //     updatedIngredients[type] = updatedCount

    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchase(updatedIngredients);
    // } 

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirect('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseRedirect();
        this.props.history.push('/checkout');
    }


    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        
        let burger = this.props.error ? <h1 style={{textAlign: 'Center'}}>Something Went Wrong</h1> : <Spinner />;

        let orderSummary = null;

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls 
                    isAuth={this.props.isAuthenticated}
                    ingredientsAdded={this.props.onAddIngredient} 
                    ingredientsRemoved={this.props.onRemoveIngredient}
                    disabledInfo={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchase(this.props.ings)}
                    openModal={this.purchaseHandler} />
                </Aux>
            )

            orderSummary = (
                <OrderSummary 
                ingredients={this.props.ings} 
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} 
                price={this.props.price}
                />
            )

        }


        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,      
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseRedirect: () => dispatch(actions.purchaseRedirect()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));