import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/index';


const logger = createLogger();
const middleware = [ReduxThunk, logger];

export default createStore(rootReducer, {}, applyMiddleware(...middleware));
