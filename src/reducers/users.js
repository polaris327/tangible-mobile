const initialState = {
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_ORDER':
      if (action.creator) {
        var update = {};
        update[action.creator._id] = action.creator;
        return Object.assign({}, state, update);
      }
      else
        return state;
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
