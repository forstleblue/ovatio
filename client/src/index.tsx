declare var module: {hot: any};

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Route, BrowserRouter as Router} from 'react-router-dom'
import { Component } from 'react';
import Add from './components/AddUserPage/AddUser'
// import * as injectTapEventPlugin from 'react-tap-event-plugin'

// import { routes } from './routes/index'
import { UserList } from "./components/UserListPage/UserList";
import { Provider } from 'react-redux';
import AppContainer from './components/AppContainer'
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer/index'

const history = createBrowserHistory();

const middleware = routerMiddleware(history);

const store = createStore(rootReducer, applyMiddleware(middleware));

const renderApp = () => {
    let result =
        <Provider store={store}>
            <AppContainer history={history} />
        </Provider>;
    if (module.hot) {
        result = <AppContainer>{result}</AppContainer>;
    }
    return result;
};

// injectTapEventPlugin();
ReactDOM.render(
        renderApp(),
    document.getElementById("root")
);