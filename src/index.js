/**
 * Created by maximcherkasov on 17.02.17.
 */
import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import { Router, browserHistory } from 'react-router';
import { routes } from './routes'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);
//        <Router history={hashHistory} routes={routes} />
