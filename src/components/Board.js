import React, { Component} from 'react';
import Lane from './Lane';
import AddLane from './AddLane';
import LaneModel from '../models/LaneModel';
import ItemModel from '../models/ItemModel';

export default class Board extends Component {
    constructor(){
        super();
        this.state = {
            lanes: [
                new LaneModel("Backlog", [
                    new ItemModel("Create a New Appointment", "As a user, I would like to create a new appointment"),
                    new ItemModel("Remove an existing Appointment", "As a user, I would like to remove an appointment")
                ]),
                new LaneModel('In Progress'),
                new LaneModel('Done')
            ]
        }
    }

    onChangeLane = lane => {
        let lanes = this.state.lanes;
        let idx = lanes.findIndex(x => x.title === lane.title);

        if (idx > -1) {
            lanes.splice(idx, 1, lane);
        }

        this.setState({lanes});
    };

    onAddLane = lane =>{
        let lanes = this.state.lanes;

        lanes.push(lane);

        this.setState({lanes});
    };

    onRemoveLane = lane => {
        let lanes = this.state.lanes;
        let idx = lanes.indexOf(lane);

        if (idx > -1){
            lanes.splice(idx, 1);
        }

        this.setState({lanes});
    };


    onChangeItemLane = (item, oldLane, newLane) => {
        oldLane.removeItem(item);
        newLane.addItem(item);
        this.setState({lanes: this.state.lanes});
    };

    render() {
        return (
            <div>


                {this.state.lanes.map(lane =>
                    <Lane
                        key={lane.title}
                        value={lane}
                        lanes={this.state.lanes}
                        onChangeLane={this.onChangeLane}
                        onRemoveLane={this.onRemoveLane}
                        onChangeItemLane={this.onChangeItemLane} />
                )}

                <AddLane onAddLane={this.onAddLane} />
            </div>
        );
    }
}
