import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../Components/UI/Buttons/Button';
import classes from './ContactData.css'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input'

import axios from '../../../axios-order';
import * as orderActions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withError';
import { updateObject, checkValidation } from '../../../shared/utility'; 

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, 
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            mail: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        isFormValid: false

    }

    orderHandler = (e) => {
        e.preventDefault();

        const formData = {}

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }

        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formData,
            userId: this.props.userID
        }

        this.props.onPurchaseInit(order, this.props.token);
    }

    inputHandler = (event, inputId) => {
        const updatedForm = updateObject(this.state.orderForm[inputId], {
            value: event.target.value,
            valid: checkValidation(event.target.value, this.state.orderForm[inputId].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputId]: updatedForm
        });

        let isFormValid = true;
        for (let inputId in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputId].valid && isFormValid;
        }

        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid})
    }

    render() {

        let formElement = [];

        for(let key in this.state.orderForm) {
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form>
            {formElement.map((el, i) => 
                <Input key={el.id}
                    elementType={el.config.elementType} 
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    changed={(event) => this.inputHandler(event, el.id)} />)}
            <Button disabled={!this.state.isFormValid} btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if (this.props.loading) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Form</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userID: state.auth.userId
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onPurchaseInit: (orderData, token) => dispatch(orderActions.purchaseInit(orderData, token))
    }
}

export default connect(mapStateToProps, mapStateToDispatch) (withErrorHandler(ContactData, axios));