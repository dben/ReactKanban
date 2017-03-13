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
        onChangeItem: React.PropTypes.func,
        onAddLane: React.PropTypes.func,
        onRemoveLane: React.PropTypes.func,
        onChangeItemLane: React.PropTypes.func,
    };

    onAddItem = item => {
        let lane = this.props.value;
        this.props.onChangeLane(LaneModel.addItem(lane, item));
    };

    onRemoveItem = idx => {
        let lane = this.props.value;
        this.props.onChangeLane(LaneModel.removeItem(lane, lane.items[idx]));
    };

    onReorder = (oldIdx, newIdx) => {
        let lane = this.props.value;
        this.props.onChangeLane(LaneModel.swapOrder(lane, oldIdx, newIdx));
    };

    onChangeItemLane = (idx, newLane) => {
        let lane = this.props.value;
        this.props.onChangeItemLane(lane.items[idx], this.props.value, newLane);
    };

    onChangeItem = (idx, newItem) => {
        let lane = this.props.value;
        this.props.onChangeLane(LaneModel.changeItem(lane, idx, newItem));
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
                    <Item key={item.title} value={item} onChange={this.onChangeItem.bind(this, index)}>
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

