const initialState = {
}

export default function customers(state = initialState, action) {
  switch (action.type) {
    case 'SET_ORDER':
      if (action.customer) {
        var update = {};
        update[action.customer._id] = action.customer;
        return Object.assign({}, state, update);
      }
      else
        return state;
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
