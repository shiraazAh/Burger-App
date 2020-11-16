import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 

import * as actions from '../../store/actions/index';

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Buttons/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { checkValidation } from '../../shared/utility';

import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.building && this.props.setAuthRedirect !== '/') {
            this.props.onSetAuthRedirect();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp );
    }

    switchSignHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        })
    }


    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
               value={formElement.config.value}
                 invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        let redirectToMain = null;

        if(this.props.isAuthenticated) {
            redirectToMain = <Redirect to={this.props.setAuthRedirect} />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        return (
            <div className={classes.Auth}>
                {redirectToMain}
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {this.props.loading ? <Spinner /> : form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                clicked={this.switchSignHandler} 
                btnType="Danger">{this.state.isSignUp ? 'SWITCH TO SIGN IN' : 'SWITCH TO SIGN UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        setAuthRedirect: state.auth.setAuth,
        building: state.burgerBuilder.building
    }
}

const mapStateToDispatch = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Auth);