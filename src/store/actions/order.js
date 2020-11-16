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

export const purchaseInit = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post("/orders.json?auth=" + token, orderData)
        .then(response => {
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
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get("/orders.json" + queryParams)
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