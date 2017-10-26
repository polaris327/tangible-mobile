import validator from 'validator'
import API from '../config/API';
import Store from '../config/store';
import Errors from './errors';

export default {
  update: function(userDetails) {
    return (dispatch) => {
      const state = Store.getState();
      let query = _.pick(userDetails, ['email', 'phone']);
      query.profile = _.omit(userDetails, ['email', 'phone']);
      API.put('/users/' + state.user._id, query).then((res) => {
        dispatch({type: 'SET_USER', user: res.data.user})
      }).catch((err) => Errors.handle(dispatch, err, 'USERS'));
    };
  },

  removeCard: function(cardId) {
    return (dispatch) => {
      const state = Store.getState();
      const userId = state.user._id;
      API.remove(`/users/${userId}/cards/${cardId}`).then((res) => {
        dispatch({type: 'REMOVE_CREDIT_CARD', id: cardId});
      }).catch((err) => Errors.handle(dispatch, err, 'USERS'));
    }
  },

  removeAddress: function(addressId) {
    return (dispatch) => {
      if (!addressId) return;
      const state = Store.getState();
      let user = state.user;
      user.addresses = _.reject(user.addresses, (address) => {return address._id == addressId});
      API.put(`/users/${user._id}`, {addresses: user.addresses}).then((res) => {
      }).catch((err) => Errors.handle(dispatch, err, 'USERS'));
      dispatch({type: 'SET_USER', user: user});
    }
  }
}
