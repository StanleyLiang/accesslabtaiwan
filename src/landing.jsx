import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import App from './containers/App';
import createRootReducer from './redux/reducers';

const history = createBrowserHistory();
const configureStore = (preloadedState) => {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                thunkMiddleware,
                createLogger()
            ),
        ),
    )
    return store
};

const store = configureStore({});

function root() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    );
}

ReactDOM.render(
    root(),
    document.getElementById('content'),
    () => {}
);