const initialState = {
}

export default function orders(state = initialState, action) {
  switch (action.type) {
    case 'SET_ORDER':
      if (action.order) {
        var update = {};
        update[action.order._id] = Object.assign({}, action.order);
        return Object.assign({}, state, update);
      }
      else
        return state;
    case 'SET_ORDERS':
      return Object.assign({}, state, _.omit(action, 'type'));
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
