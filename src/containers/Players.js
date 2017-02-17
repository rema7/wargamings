/**
 * Created by maximcherkasov on 17.02.17.
 */
import {fetchPlayers, fetchPlayersSuccess, fetchPlayersFailure} from "../actions/PlayersAction";
import {Players} from "../components/Players";
import connect from "react-redux/es/connect/connect";


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

export default connect(mapStateToProps,mapDispatchToProps)(Players);
