import cookie from 'react-cookie';
import Errors from './errors';
import { browserHistory } from 'react-router';
import API from '../config/API';
import Users from './users';
import Analytics from '../config/analytics';

export default {
  login: function(params) {
    return (dispatch) => {
      dispatch({ type: 'LOGGING_IN' });
      API.post('/auth/login', params).then((res) => {
        cookie.save('token', res.data.token, { path: '/' });
        cookie.save('user', res.data.user, { path: '/' });
        dispatch({ type: 'LOGIN', user: res.data.user });
        self.props.history.push('/orders');
        if (process.env.NODE_ENV == 'production')
          Analytics.loadHeap(res.data.user._id);
      }).catch((err) => Errors.handle(dispatch, err, 'AUTH'));
    }
  },

  loginWithToken: function(token) {
    return (dispatch) => {
      dispatch({ type: 'LOGGING_IN' });
      API.post('/auth/login-token', {}, token.replace('JWT ', '')).then((res) => {
        cookie.save('token', res.data.token, { path: '/' });
        cookie.save('user', res.data.user, { path: '/' });
        dispatch({ type: 'LOGIN', user: res.data.user });
        if (process.env.NODE_ENV == 'production')
          Analytics.loadHeap(res.data.user._id);
      }).catch((err) => Errors.handle(dispatch, err, 'AUTH'));
    }
  },

  logout: function(self) {
    return function (dispatch) {
      dispatch({ type: 'LOGOUT'});
      cookie.remove('token', { path: '/' });
      cookie.remove('user', { path: '/' });
      self.props.history.push('/login');
    };
  }
}
