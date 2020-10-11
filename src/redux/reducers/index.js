import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import users from './users';

const createRootReducer = (history) => {
    return combineReducers({
        router: connectRouter(history),
        users
    });
};

export default createRootReducer;