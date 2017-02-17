/**
 * Created by maximcherkasov on 17.02.17.
 */
import React from 'react'

class ComparedTableRow extends React.Component {
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
            <td className={(
                firstRating > secondRating ? 'bg-success' :
                    firstRating == secondRating ? 'bg-warning' : 'bg-danger')}>{firstRating}</td>
            <td className={(
                first.wins_total > second.wins_total ? 'bg-success' :
                    first.wins_total == second.wins_total ? 'bg-warning' : 'bg-danger')}>{first.wins_total}</td>
            <td className={(
                firstAvg > secondAvg ? 'bg-success' :
                    firstAvg > secondAvg ? 'bg-warning' : 'bg-danger')}>{firstAvg}</td>
            <td className={(
                first.exp_total > second.exp_total ? 'bg-success' :
                    first.exp_total == second.exp_total ? 'bg-warning' : 'bg-danger')}>{first.exp_total}</td>
            <td className={(
                first.battles_total > second.battles_total ? 'bg-success' :
                    first.battles_total == second.battles_total ? 'bg-warning' : 'bg-danger')}>{first.battles_total}</td>
            <td className={(
                first.vehicles_x > second.vehicles_x ? 'bg-success' :
                    first.vehicles_x == second.vehicles_x ? 'bg-warning' : 'bg-danger')}>{first.vehicles_x}</td>
            <td className={(
                first.days_total > second.days_total ? 'bg-success' :
                    first.days_total == second.days_total ? 'bg-warning' : 'bg-danger')}>{first.days_total}</td>
        </tr>
    }
}

export class ComparePlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstValue: 'Stephen', secondValue: 'Michelle'};
        this.state.result = [];
    }

    handleFirstChange(event) {
        this.setState({firstValue: event.target.value});
    }

    handleSecondChange(event) {
        this.setState({secondValue: event.target.value});
    }

    onSubmit() {
        const {players} = this.props.playersList;
        const firstPlayer = this.state.firstValue;
        const secondPlayer = this.state.secondValue;
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
            rows.push(<ComparedTableRow first={result[0]} second={result[1]}/>);
            rows.push(<ComparedTableRow first={result[1]} second={result[0]}/>);
        }

        return (
            <div>
                <form>
                    <div className={'form-group ' + (this.state.firstNotFound ? 'has-danger' : '')}>
                        <label>First player</label>
                        <input className="form-control"
                               type="text"
                               name="name"
                               placeholder="Enter first player name"
                               defaultValue={this.state.firstValue}
                               onChange={::this.handleFirstChange}/>
                    </div>
                    <div className={'form-group ' + (this.state.secondNotFound ? 'has-danger' : '')}>
                        <label>Second player</label>
                        <input className="form-control"
                               type="text"
                               name="name"
                               placeholder="Enter second player name"
                               defaultValue={this.state.secondValue}
                               onChange={::this.handleSecondChange}/>
                    </div>
                </form>
                <div className="form-group">
                    <button onClick={::this.onSubmit} className="btn btn-primary">Compare</button>
                </div>
                <div className="result-table">
                    <div className="players-table">
                        <table className="table table-hover">
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