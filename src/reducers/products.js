const initialState = {
}

export default function products(state = initialState, action) {
  switch (action.type) {
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
