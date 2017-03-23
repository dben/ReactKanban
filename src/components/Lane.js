import React, { Component} from 'react';
import LaneModel from '../models/LaneModel';
import Item from './Item';
import AddItem from './AddItem';

import ItemButtons from './ItemButtons';

export default class Lane extends Component {
    static propTypes = {
        value: React.PropTypes.instanceOf(LaneModel),
        lanes: React.PropTypes.arrayOf(React.PropTypes.instanceOf(LaneModel)),
        onChangeLane: React.PropTypes.func,
        onRemoveLane: React.PropTypes.func,
        onChangeItemLane: React.PropTypes.func,
    };


    onAddItem = item => {
        this.props.onChangeLane(LaneModel.addItem(this.props.value, item));
    };

    onRemoveItem = item => {
        this.props.onChangeLane(LaneModel.removeItem(this.props.value, item));
    };

    onReorder = (idxa, idxb) => {
        this.props.onChangeLane(LaneModel.swapItems(this.props.value, idxa, idxb));
    };

    onChangeItemLane = (idx, newLane) => {
        this.props.onChangeItemLane(this.props.value, newLane, this.props.value.items[idx]);
    };

    onChangeItem = (idx, item) => {
        this.props.onChangeLane(LaneModel.changeItem(this.props.value, idx, item));
    };

    onRemoveLane = e => {
        e.preventDefault();
        this.props.onRemoveLane(this.props.value);
    };


    render() {
        let lane = this.props.value;
        return (
            <div className="lane">
                <button className="btn btn-danger pull-right" onClick={this.onRemoveLane}><i className="glyphicon glyphicon-trash" /></button>
                <h2>{lane.title}</h2>
                {lane.items.map((item, idx) =>
                    <Item key={item.title} value={item} onChange={this.onChangeItem.bind(this, idx)}>
                        <ItemButtons
                            onChangeItemLane={this.onChangeItemLane}
                            onRemove={this.onRemoveItem.bind(this, item)}
                            onReorder={this.onReorder}
                            lanes={this.props.lanes}
                            index={idx}
                            total={lane.items.length}
                        />
                    </Item>
                )}

                <AddItem onAdd={this.onAddItem} />
            </div>
        );
    }
}
