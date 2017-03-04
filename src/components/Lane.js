import React, { Component} from 'react';
import LaneItem from './LaneItem';
import AddItem from './AddItem';
import LaneModel from '../models/LaneModel';

class Lane extends Component {
    static propTypes = {
        value: React.PropTypes.instanceOf(LaneModel),
        lanes: React.PropTypes.arrayOf(React.PropTypes.instanceOf(LaneModel)),
        onChangeLane: React.PropTypes.func,
        onAddLane: React.PropTypes.func,
        onRemoveLane: React.PropTypes.func,
        onChangeItemLane: React.PropTypes.func,
    };

    onAddItem = item => {
        let lane = this.props.value;

        lane.addItem(item);
        this.props.onChangeLane(lane);

    };

    onRemoveItem = item => {
        let lane = this.props.value;

        lane.removeItem(item);
        this.props.onChangeLane(lane);

    };

    onRemoveLane = e => {
        e.preventDefault();
        this.props.onRemoveLane(this.props.value);
    };

    onReorder = (oldIdx, newIdx) => {
        let lane = this.props.value;
        lane.swapOrder(oldIdx, newIdx);
        this.props.onChangeLane(lane);
    };

    onChangeItemLane = (item, newLane) => {
        this.props.onChangeItemLane(item, this.props.value, newLane);
    };

    render() {
        return (
            <div className="lane">
                <button className="btn btn-danger pull-right" onClick={this.onRemoveLane}><i className="glyphicon glyphicon-trash" /></button>

                <h1>{this.props.value.title}</h1>
                <AddItem onAdd={this.onAddItem} />

                {this.props.value.items.map((item, index) =>
                    <LaneItem key={item.title}
                              lanes={this.props.lanes.filter(x => x !== this.props.value)}
                              index={index}
                              total={this.props.value.items.length}
                              value={item}
                              onChangeItem={this.props.onChangeLane}
                              onChangeItemLane={this.onChangeItemLane}
                              onReorder={this.onReorder}
                              onRemove={this.onRemoveItem} />
                )}


            </div>
        );
    }
}

export default Lane;
