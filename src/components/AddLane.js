import React, { Component} from 'react';
import LaneModel from '../models/LaneModel';

export default class AddLane extends Component {
    constructor(){
        super();
        this.state = {
            lane: new LaneModel()
        }
    }

    static propTypes = {
        onAddLane: React.PropTypes.func
    };

    onChangeLaneTitle = e => {
        let lane = this.state.lane;

        lane.title = e.target.value;

        this.setState({lane})
    };

    onSubmit = e => {
        e.preventDefault();
        let lane = this.state.lane;

        try {
            lane.checkValid();
        }catch(err){
            alert(err);
            return;
        }

        this.props.onAddLane(lane);

        this.setState({
            lane: new LaneModel()
        });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="lane">
                <h2>Add New Lane</h2>

                <div className="lane-item">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={this.state.lane.title} onChange={this.onChangeLaneTitle} />
                </div>
                <input type="submit" className="btn btn-primary" value="Add Lane" />
                </div>
            </form>
        );
    }
}
