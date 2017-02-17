/**
 * Created by maximcherkasov on 17.02.17.
 */
import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import App from "./containers/App";
import Players from "./containers/Players";
import ComparePlayers from "./containers/ComparePlayers";
import NotFound from "./components/NotFound";


export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRedirect to='/list' />
            <Route path='/compare' component={ComparePlayers} />
            <Route path='/list' component={Players} />
        </Route>
        <Route path='*' component={NotFound} />
    </div>
);
//        <Route path='*' component={NotFound} />
