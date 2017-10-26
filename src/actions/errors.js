import Auth from './auth';

export default {
  handle: function(dispatch, error, type) {
    console.log('Error type: ', type);
    console.log(error);
    let errorMessage = error.response ? error.response.data : error;
    // First check for NOT AUTHENTICATED ERROR
    if (type != 'AUTH' && (error.status === 401 || error.response.status === 401)) {
      errorMessage = 'You are not authorized to do this.';
      return dispatch(Auth.logout());
    }
    return errorTypes[type] ? errorTypes[type](dispatch, error) : errorTypes.default(dispatch, error);
  }
}

const errorTypes = {
  AUTH: function(dispatch, error) {
    return dispatch({type: 'LOGIN_ERROR', error: 'Incorrect email or password'});
  },

  CUSTOMERS: function(dispatch, error) {
    return null;
  },

  ORDERS: function(dispatch, error) {
    return null;
  },

  USERS: function(dispatch, error) {
    return null;
  },

  PAYMENTS: function(dispatch, error) {
    const message = error.response.data.error || 'Credit Card error';
    dispatch({type: 'SET_ORDER_ERROR', error: message});
  },

  default: function(dispatch, error) {
    return null;
  }
}
