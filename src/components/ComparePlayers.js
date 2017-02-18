/**
 * Created by maximcherkasov on 17.02.17.
 */
import React from 'react'

class ComparedTableRow extends React.Component {

    compareField(value1, value2) {
        if (value1 > value2)
            return 'bg-success';
        else if (value1 == value2)
            return 'bg-warning';
        else if (value1 < value2)
            return 'bg-danger';
        else
            return ''
    }

    render() {
        const {first, second} = this.props;

        return <tr>
            <td>{first.name}</td>
            <td className={this.compareField(first.rating,second.rating)}>{first.rating}</td>
            <td className={this.compareField(first.wins_total, second.wins_total)}>{first.wins_total}</td>
            <td className={this.compareField(first.avg_exp, second.avg_exp)}>{first.avg_exp}</td>
            <td className={this.compareField(first.exp_total, second.exp_total)}>{first.exp_total}</td>
            <td className={this.compareField(first.battles_total, second.battles_total)}>{first.battles_total}</td>
            <td className={this.compareField(first.vehicles_x, second.vehicles_x)}>{first.vehicles_x}</td>
            <td className={this.compareField(first.days_total, second.days_total)}>{first.days_total}</td>
        </tr>
    }
}

export class ComparePlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstPlayer: 'Stephen', secondPlayer: 'Michelle'};
        this.state.firstInput = {error: false, message: ''};
        this.state.secondInput = {error: false, message: ''};
        this.state.result = [];
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    makeInputError(isError, message, second=false) {
        if (!second)
            this.setState({ firstInput: {error: isError, message: message}});
        else
            this.setState({ secondInput: {error: isError, message: message}});
    }

    fireFirstInputError(message) {
        this.makeInputError(true, message);
    }

    dropFirstInputError() {
        this.makeInputError(false, '');
    }

    isFirstInputError() {
        return this.state.firstInput.error
    }

    fireSecondInputError(message) {
        this.makeInputError(true, message, true);
    }

    dropSecondInputError() {
        this.makeInputError(false, '', true);
    }

    isSecondInputError() {
        return this.state.secondInput.error
    }


    onSubmit() {
        const {players} = this.props.playersList;
        const {firstPlayer, secondPlayer} = this.state;

        this.fireFirstInputError('Player not found.');
        this.fireSecondInputError('Player not found.');

        let res = players.filter((player) => {
            if (player.name == firstPlayer) {
                if (!player.is_hidden) {
                    this.dropFirstInputError();
                    return player;
                } else {
                    this.fireFirstInputError('Player is hidden.');
                }
            }
            else if (player.name == secondPlayer) {
                if (!player.is_hidden) {
                    this.dropSecondInputError();
                    return player;
                } else {
                    this.fireSecondInputError('Player is hidden.');
                }
            }
        });

        this.setState({result: res.length == 2 ? res : []});
    }

    render() {
        const {loading, error} = this.props.playersList;
        const result = this.state.result;

        if (loading) {
            return <div className="container">Players loading...</div>
        } else if (error) {
            return <div className="alert alert-danger">Error: Can't load players from server</div>
        }

        let rows = [];

        if (result.length > 0) {
            rows.push(<ComparedTableRow key={0} first={result[0]} second={result[1]}/>);
            rows.push(<ComparedTableRow key={1} first={result[1]} second={result[0]}/>);
        }

        return (
            <div>
                <form>
                    <div className={'form-group ' + (this.isFirstInputError() ? 'has-danger' : '')}>
                        <label>First player</label>
                        <input className="form-control"
                               type="text"
                               name="firstPlayer"
                               placeholder="Enter first player name"
                               defaultValue={this.state.firstPlayer}
                               onChange={::this.handleInputChange}/>
                        <small className="form-control-feedback">{this.state.firstInput.message}</small>
                    </div>
                    <div className={'form-group ' + (this.isSecondInputError() ? 'has-danger' : '')}>
                        <label>Second player</label>
                        <input className="form-control"
                               type="text"
                               name="secondPlayer"
                               placeholder="Enter second player name"
                               defaultValue={this.state.secondPlayer}
                               onChange={::this.handleInputChange}/>
                        <small className="form-control-feedback">{this.state.secondInput.message}</small>
                    </div>
                </form>
                <div className="form-group">
                    <button onClick={::this.onSubmit} className="btn btn-primary">Compare</button>
                </div>
                <div className="result-table">
                    <div className="players-table">
                        <table className="table table-hover table-bordered">
                            <thead className="thead-default">
                            <tr>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Wins</th>
                                <th>Avg exp</th>
                                <th>Experience</th>
                                <th>Battles</th>
                                <th>Vehicles</th>
                                <th>Days</th>
                            </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}