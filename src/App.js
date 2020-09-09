import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import { Switch , Route, withRouter, Redirect} from 'react-router-dom';
import Orders from  './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/logout';

import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
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
