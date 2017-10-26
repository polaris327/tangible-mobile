import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import { Provider } from 'react-redux';
import Routes from './config/routes';
import Store from './config/store';
import lodash from 'lodash';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Loading from './components/loading';
import Login from './pages/auth/login';
import Auth from './actions/auth';

// Import stylesheets
import './stylesheets/base.scss';

console.log('Running ', process.env.NODE_ENV);

_ = lodash;
_.contains = _.includes;

document.title = 'Tangible';

const AppWithProvider = connect(mapStateToProps)((props) => {
  const queries = queryString.parse(window.location.search);
  const token = queries.token || cookie.load('token');
  if (token && !props.status) {
    props.dispatch(Auth.loginWithToken(token));
    return <Loading message={'Logging you in securely'} top="256px" size={48} />
  }
  else if (props.status == 'loggingIn')
    return <Loading message={'Logging you in securely'} top="256px" size={48} />
  else if (props.status == 'authenticated')
    return Routes();
  else
    return <Login />;
})

function mapStateToProps(state) {
  return {
    status: state.auth.status,
  }
}

const App = () => <Provider store={Store}><AppWithProvider /></Provider>

ReactDOM.render(App(), document.getElementById('react-app'))
