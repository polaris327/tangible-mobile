const initialState = { error: '', message: '', content: '', status: null };

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FORGOT_PASSWORD_REQUEST':
      return { ...state, message: action.payload.message };
    case 'RESET_PASSWORD_REQUEST':
      return { ...state, message: action.payload.message };
    case 'LOGGING_IN':
      return Object.assign({}, state, {status: 'loggingIn'});
    case 'LOGIN':
      return Object.assign({}, state, {status: 'authenticated'});
    case 'LOGIN_ERROR':
      return Object.assign({}, state, {status: 'error', error: action.error});
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
