import API from '../config/API';
import config from '../config/main';
import Helpers from '../helpers';
import Errors from './errors';

export default {
  get: function(orderId, options) {
    return (dispatch) => {
      API.get(`/orders/${orderId}`, { populate: true }).then((res) => {
        dispatch({ type: 'SET_ORDER', order: res.data.order })
      }).catch((err) => Errors.handle(dispatch, err, 'ORDERS'));
    }
  },

  getAll: function(query) {
    return (dispatch) => {
      API.get('/orders', query).then((res) => {
        dispatch(Object.assign({type: 'SET_ORDERS'}, _.keyBy(res.data.orders, '_id')));
      }).catch((err) => Errors.handle(dispatch, err, 'ORDERS'));
    }
  },

  sendNewLink: function(orderId) {
    return () => {
      API.post(`/orders/${orderId}/send/link`).then((res) => {
      }).catch((err) => Errors.handle(dispatch, err, 'ORDERS'));
    };
  },

  addQuantity: function(order, productId, quantity) {
    return (dispatch) => {
      const index = _.findIndex(order.products, (product) => product._id == productId);
      if (index > -1) {
        if (quantity)
          order.products[index].quantity = quantity;
        else
          order.products.splice(index, 1);
      }
      order.promo = null;
      order.total = Helpers.total(order);
      dispatch({type: 'SET_ORDER', order});
    }
  },

  submit: function(order, params) {
    return (dispatch) => {
      dispatch({type: 'SET_ORDER_STATUS', value: 'submitting'});
      let req = {
        order: _.pick(order, ['_id', 'products', 'promo']),
        customer: params.customer,
        shipping: params.shipping
      };
      if (order.demo)
        req.payment = {token: 'demo'};
      if (order.payment)
        req.payment = {};
      if (req.payment)
        dispatch(UploadOrder(req));
      else {
        if (params.payment.id)
          req.payment = { id: params.payment.id };
        else {
          // Create Stripe token
          Stripe.setPublishableKey(config.stripePublicKey);
          Stripe.card.createToken({
            number: params.payment.ccNumber,
            cvc: params.payment.ccCVC,
            exp_month: params.payment.ccExpMonth,
            exp_year: params.payment.ccExpYear,
            address_zip: params.ccZip
          }, (status, response) => {
            if (status == 200) {
              req.payment = { token: response.id, save: params.payment.save };
              dispatch(UploadOrder(req));
            }
            else
              dispatch({type: 'SET_ORDER_ERROR', error: response.error && response.error.message});
          });
        }
      }
    }
  }
}

function UploadOrder(req) {
  return (dispatch) => {
    API.post(`/orders/submit`, req).then((res) => {
      dispatch({type: 'SET_ORDER_STATUS', value: 'success'});
    }).catch((err) => Errors.handle(dispatch, err, 'PAYMENTS'));
  }
}
