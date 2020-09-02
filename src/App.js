import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import { Switch , Route} from 'react-router-dom';
import Orders from  './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';

class App extends Component {

  render() {
    return (
        <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
        </div>
    );
  }
}

export default App;
