import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    }
}

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    } 
}

export const purchaseRedirect = () => {
    return {
        type: actionTypes.PURCHASE_REDIRECT
    }
}

export const purchaseInit = (orderData) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post("/orders.json ", orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get("/orders.json")
        .then(response => {
            const allOrders = response.data;
            const ordersArray = [];
            // const ingredients = allOrders.ingredients;
            // const price = allOrders.totalPrice;
            for (let key in allOrders) {
                ordersArray.push({...allOrders[key], id: key});
            }

            dispatch(fetchOrderSuccess(ordersArray));
        })
        .catch(error => {
            dispatch(fetchOrderFail(error));
        })
    }
}