import React, { Component} from 'react';
import Item from './Item';
import LaneModel from '../models/LaneModel';
import ItemModel from '../models/ItemModel';

class LaneItem extends Component {
    static propTypes = {
        value: React.PropTypes.instanceOf(ItemModel),
        lanes: React.PropTypes.arrayOf(React.PropTypes.instanceOf(LaneModel)),
        index: React.PropTypes.number,
        total: React.PropTypes.number,
        onChangeItem: React.PropTypes.func,
        onRemove: React.PropTypes.func,
        onReorder: React.PropTypes.func,
        onChangeItemLane: React.PropTypes.func
    };

    onRemove = e => {
        e.preventDefault();
        this.props.onRemove(this.props.value);
    };

    onMoveUp = e => {
        e.preventDefault();
        this.props.onReorder(this.props.index, this.props.index - 1);
    };

    onMoveDown = e => {
        e.preventDefault();
        this.props.onReorder(this.props.index, this.props.index + 1);
    };

    onChangeItemLane = (lane, e) => {
        e.preventDefault();
        this.props.onChangeItemLane(this.props.value, lane)
    };

    render() {
        return (
                <div className="lane-item">
                    <Item value={this.props.value} onChange={this.props.onChangeItem} />
                    <div className="form-group">
                        <label>Move To</label>
                        <ul>
                        {this.props.lanes.map(lane =>
                            <li key={lane.title}><a href="#" onClick={this.onChangeItemLane.bind(this,lane)}>{lane.title}</a></li>
                        )}
                        </ul>
                    </div>

                    {this.props.index > 0 ?
                        <button className="btn btn-default pull-right" onClick={this.onMoveUp}><i className="glyphicon glyphicon-arrow-up" /></button>
                        : null}
                    {this.props.total > this.props.index+1 ?
                    <button className="btn btn-default pull-right" onClick={this.onMoveDown}><i className="glyphicon glyphicon-arrow-down" /></button>
                        : null}

                    <button className="btn btn-danger " onClick={this.onRemove}><i className="glyphicon glyphicon-trash" /></button>
                </div>
        );
    }
}

export default LaneItem;
