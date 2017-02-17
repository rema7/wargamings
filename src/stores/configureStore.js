/**
 * Created by maximcherkasov on 17.02.17.
 */
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import promise from 'redux-promise';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(promise));
}