import React from 'react'
import { Link } from 'react-router'
import {connect} from "react-redux";
import {fetchPlayers, fetchPlayersSuccess, fetchPlayersFailure} from "../actions/PlayersAction";

export class App extends React.Component {
    componentWillMount() {
        this.props.fetchPlayers();
    }

    render() {

        return (
        <div className="container">
            <ul className="nav"  >
                <li className="nav-item">
                    <Link className="nav-link" activeClassName='active' to='/list'>Players</Link>
                </li>
                <li>
                    <Link className="nav-link" activeClassName='active' to='/compare'>Compare players</Link>
                </li>
            </ul>
            <div className="form-group"></div>
            {this.props.children}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        playersList: state.playersList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPlayers: () => {
            dispatch(fetchPlayers()).then((response) => {
                !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response));
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);