/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    purchased: false,
    loading: false
}

const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_START: return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_FAIL: return updateObject(state, { loading: false });
        case actionTypes.PURCHASE_REDIRECT: return updateObject(state, { purchased: false});
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false });
        default: return state;
    }
}

export default reducer;