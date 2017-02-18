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
        const {firstRating, secondRating} = {
            'firstRating': (first.wins_total / first.days_total).toFixed(2),
            'secondRating': (second.wins_total / second.days_total).toFixed(2)
        };

        const {firstAvg, secondAvg} = {
            'firstAvg': (first.exp_total / first.days_total).toFixed(2),
            'secondAvg': (second.exp_total / second.days_total).toFixed(2)
        };

        return <tr>
            <td>{first.name}</td>
            <td className={(this.compareField(firstRating,secondRating))}>{firstRating}</td>
            <td className={(this.compareField(first.wins_total, second.wins_total))}>{first.wins_total}</td>
            <td className={this.compareField(firstAvg,secondAvg)}>{firstAvg}</td>
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
        this.state.result = [];
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        this.setState({firstPlayer: event.target.value});
    }

    onSubmit() {
        const {players} = this.props.playersList;
        const {firstPlayer, secondPlayer} = this.state;

        this.setState({firstNotFound: true});
        this.setState({secondNotFound: true});

        let res = players.filter((player) => {
            if (player.name == firstPlayer) {
                if (!player.is_hidden) {
                    this.setState({firstNotFound: false});
                    return player;
                }
            }
            else if (player.name == secondPlayer) {
                if (!player.is_hidden) {
                    this.setState({secondNotFound: false});
                    return player;
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
                    <div className={'form-group ' + (this.state.firstNotFound ? 'has-danger' : '')}>
                        <label>First player</label>
                        <input className="form-control"
                               type="text"
                               name="firstValue"
                               placeholder="Enter first player name"
                               defaultValue={this.state.firstPlayer}
                               onChange={::this.handleInputChange}/>
                    </div>
                    <div className={'form-group ' + (this.state.secondNotFound ? 'has-danger' : '')}>
                        <label>Second player</label>
                        <input className="form-control"
                               type="text"
                               name="secondValue"
                               placeholder="Enter second player name"
                               defaultValue={this.state.secondPlayer}
                               onChange={::this.handleInputChange}/>
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