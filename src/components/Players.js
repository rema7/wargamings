/**
 * Created by maximcherkasov on 17.02.17.
 */

import React from 'react'
import {fetchPlayers, fetchPlayersSuccess, fetchPlayersFailure} from "../actions/PlayersAction";
import connect from "react-redux/es/connect/connect";

class TableRow extends React.Component {
    render() {
        const {player} = this.props;

        return <tr key={player.id}>
            <td>{player.id}</td>
            <td>{player.name}</td>
            <td>{player.rating}</td>
            <td>{player.wins_total}</td>
            <td>{player.avg_exp}</td>
            <td>{player.exp_total}</td>
            <td>{player.battles_total}</td>
            <td>{player.vehicles_x}</td>
            <td>{player.days_total}</td>
            <td>
                <input type="checkbox" disabled="true" checked={player.is_hidden}/>
            </td>
            <td>{player.created_at}</td>
        </tr>
    }
}

export class Players extends React.Component {
    componentWillMount() {
    }

    onRefresh() {
        this.props.fetchPlayers();
    }

    render() {
        const { players, loading, error } = this.props.playersList;

        if (loading) {
            return <div className="container">Players loading...</div>
        } else if(error) {
            return <div className="alert alert-danger">Error: Can't load players from server</div>
        }

        return (
            <div className="players-table">
                <table className="table table-hover">
                    <thead className="thead-default">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Wins</th>
                        <th>Avg exp</th>
                        <th>Experience</th>
                        <th>Battles</th>
                        <th>Vehicle</th>
                        <th>Days</th>
                        <th>Hidden</th>
                        <th>Created</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        players.map((player,i) => {
                            return <TableRow key={i.toString()} player={player}/>
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

