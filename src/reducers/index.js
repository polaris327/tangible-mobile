import {combineReducers} from 'redux';
import app from './app';
import auth from './auth';
import user from './user';
import users from './users';
import orders from './orders';
import customers from './customers';
import products from './products';
import companies from './companies';

export default combineReducers({
  app, auth, user, users, orders, customers, products, companies
});
