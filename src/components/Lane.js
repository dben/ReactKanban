import React, { Component} from 'react';
import ItemButtons from './ItemButtons';
import Item from './Item';
import AddItem from './AddItem';
import LaneModel from '../models/LaneModel';

export default class Lane extends Component {
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

    onRemoveItem = idx => {
        let lane = this.props.value;

        lane.removeItem(lane.items[idx]);
        this.props.onChangeLane(lane);
    };

    onReorder = (oldIdx, newIdx) => {
        let lane = this.props.value;
        lane.swapOrder(oldIdx, newIdx);
        this.props.onChangeLane(lane);
    };

    onChangeItemLane = (idx, newLane) => {
        let lane = this.props.value;
        this.props.onChangeItemLane(lane.items[idx], this.props.value, newLane);
    };


    onRemoveLane = e => {
        e.preventDefault();
        this.props.onRemoveLane(this.props.value);
    };

    render() {
        return (
            <div className="lane">
                <button className="btn btn-danger pull-right" onClick={this.onRemoveLane}><i className="glyphicon glyphicon-trash" /></button>

                <h2>{this.props.value.title}</h2>
                <AddItem onAdd={this.onAddItem} />

                {this.props.value.items.map((item, index) =>
                    <Item key={item.title} value={item} onChange={this.props.onChangeItem}>
                        <ItemButtons lanes={this.props.lanes.filter(x => x !== this.props.value)}
                                     index={index}
                                     total={this.props.value.items.length}
                                     onChangeItemLane={this.onChangeItemLane}
                                     onReorder={this.onReorder}
                                     onRemove={this.onRemoveItem} />
                    </Item>
                )}
            </div>
        );
    }
}

