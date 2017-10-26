const initialState = {
  cards: [],
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, action.user);
    case 'SET_USER':
      return Object.assign({}, action.user);
    case 'REMOVE_CREDIT_CARD':
      return Object.assign({}, state, {
        cards: _.reject(state.cards, (card, i) => { return card.id == action.id })
      });
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
