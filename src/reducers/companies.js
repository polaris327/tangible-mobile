const initialState = {
}

export default function companies(state = initialState, action) {
  switch (action.type) {
    case 'SET_ORDER':
      if (action.company) {
        var update = {};
        update[action.company._id] = action.company;
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
