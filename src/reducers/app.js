const initialState = {
  orderError: null,
  orderStatus: 'ready',
  customer: null,
  shipping: null,
  payment: null,
  menuTitle: ''
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case 'SET_ORDER_STATUS':
      return Object.assign({}, state, { orderStatus: action.value });
    case 'SET_ORDER_ERROR':
      return Object.assign({}, state, {orderError: action.error, orderStatus: 'error'});
    case 'SET_MENU_TITLE':
      return Object.assign({}, state, { menuTitle: action.title });
    case 'SET_CUSTOMER':
      return Object.assign({}, state, { customer: action.value });
    case 'SET_SHIPPING':
      return Object.assign({}, state, { shipping: action.value });
    case 'SET_PAYMENT':
      return Object.assign({}, state, { payment: action.value });
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
