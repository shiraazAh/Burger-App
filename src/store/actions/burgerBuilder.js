import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const setIngredientsFailed = (err) => {
    return {
        type: actionTypes.SET_INGREDIENT_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-my-burger-84fc4.firebaseio.com/ingredients.json")
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(setIngredientsFailed());
        })
    } 
}