import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom';

class Checkout extends Component {


    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to="/" />

        if(this.props.ings) {
            const purchased = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary
                    ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinue={this.checkoutContinue} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);