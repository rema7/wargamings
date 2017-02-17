import {GET_PLAYERS, COMPARE_PLAYERS} from "../constants/index";
import {FETCH_PLAYERS, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_FAILURE} from "../actions/PlayersAction";

const initialState = { playersList: {players: [], error:null, loading: false} };

export default function players(state = initialState, action) {
    switch (action.type) {
        case FETCH_PLAYERS:
            return { ...state, playersList: {players:[], error: null, loading: true} };

        case FETCH_PLAYERS_SUCCESS:
            return { ...state, playersList: {players: action.payload, error:null, loading: false} };

        case FETCH_PLAYERS_FAILURE:
            let error = action.payload || {message: action.payload.message};
            return { ...state, playersList: {players: [], error: error, loading: false} };

        case COMPARE_PLAYERS:
            return { ...state, players: action.data };

        default:
            return state;
    }
}