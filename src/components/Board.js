import React, { Component} from 'react';
import LaneModel from '../models/LaneModel';
import ItemModel from '../models/ItemModel';
import Lane from './Lane';
import AddLane from './AddLane';

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

    static propTypes = {};

    onChangeLanes = lane => {
        let lanes = this.state.lanes;
        let idx = lanes.findIndex(x => x.title === lane.title);

        if (idx > -1 ){
            this.setState({
                lanes: [
                    ...lanes.slice(0, idx),
                    lane,
                    ...lanes.slice(idx + 1)
                ]
            });
        }
    };

    onAddLane = lane => {
        this.setState({
            lanes: [...this.state.lanes, lane]
        });
    };

    onRemoveLane = lane => {
        this.setState({
            lanes: this.state.lanes.filter(x => x !== lane)
        });
    };

    onChangeItemLane = (oldLane, newLane, item) => {
        this.setState({lanes: this.state.lanes.map(lane => {
                if (lane === oldLane){
                    return LaneModel.removeItem(oldLane, item);
                }else if(lane === newLane){
                    return LaneModel.addItem(newLane, item);
                }else{
                    return lane;
                }
            })
        });
    };

    render() {
        return (
            <div>
                {this.state.lanes.map(lane =>
                    <Lane key={lane.title}
                          value={lane}
                          lanes={this.state.lanes}
                          onChangeLane={this.onChangeLanes}
                          onRemoveLane={this.onRemoveLane}
                          onChangeItemLane={this.onChangeItemLane} />
                )}

                <AddLane onAddLane={this.onAddLane}/>

            </div>
        );
    }
}
