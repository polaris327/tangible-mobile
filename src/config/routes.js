import React from 'react';
import {BrowserRouter as Router, browserHistory, Route, Redirect, Switch } from 'react-router-dom';

// Import Pages
import App from '../layouts/app';
import Logout from '../pages/auth/logout';
import Error404 from '../pages/errors/404';
//import ForgotPassword from './components/auth/forgot_password';
//import ResetPassword from './components/auth/reset_password';
import OrdersList from '../pages/orders/list';
import Order from '../pages/orders/order';
import Settings from '../pages/settings';
import SettingsProfile from '../pages/settings/profile';

export default () => (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/orders" />} />
        <Route exact path="/login" render={() => <Redirect to="/orders" />} />
        <Route exact path="/orders" component={App(OrdersList, 'My Orders')} />
        <Route exact path="/orders/:orderId" component={App(Order)} />
        <Route exact path="/settings" component={App(Settings, 'Settings')} />
        <Route exact path="/settings/profile" component={App(SettingsProfile, 'Profile')} />
        <Route exact path="/logout" component={Logout} />
        <Route component={Error404} />
      </Switch>
    </Router>
);
