import React, { Component } from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Switch , Route, withRouter, Redirect} from 'react-router-dom';
import Logout from './Containers/Auth/Logout/logout';

import * as actions from './store/actions/index'

const asyncCheckout = asyncComponent(() => {
  return import('./Containers/Checkout/Checkout');
}) 

const asyncOrder = asyncComponent(() => {
  return import('./Containers/Orders/Orders');
}) 

const asyncAuth = asyncComponent(() => {
  return import('./Containers/Auth/Auth');
}) 

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
        <div>
        <Layout>
          {routes}
        </Layout>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapStateToDispatch = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App));
