/**
 * Created by maximcherkasov on 17.02.17.
 */
import {GET_PLAYERS} from "../constants/index";
import axios from 'axios';

export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

// export const FETCH_PLAYERS = 'FETCH_PLAYERS';
// export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
// export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';


const ROOT_URL = 'localhost:8000';

export function fetchPlayers() {
    const request = axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/players',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    return {
        type: FETCH_PLAYERS,
        payload: request
    };
}

export function fetchPlayersSuccess(players) {
    return {
        type: FETCH_PLAYERS_SUCCESS,
        payload: players.map((player) => {
            player.rating = (player.wins_total/player.days_total).toFixed(3);
            player.avg_exp = (player.exp_total/player.days_total).toFixed(3);
            return player
        })
    };
}

export function fetchPlayersFailure(error) {
    return {
        type: FETCH_PLAYERS_FAILURE,
        payload: error
    };
}