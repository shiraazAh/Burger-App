import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../Components/Order/Order';
import axios from '../../axios-order';
import withError from '../../hoc/withErrorHandler/withError';
import Spinner from '../../Components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrder();
    }

    render() {

        let allOrders = <Spinner />
        
        if(!this.props.loading){
            allOrders = this.props.orders.map((order, i)  => <Order key={order.id} ingredients={order.ingredients} totalPrice={order.totalPrice} />)
        }
        return (
            <div>
                {allOrders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(withError(Orders, axios));