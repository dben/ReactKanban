import React, { Component} from 'react';
import LaneModel from '../models/LaneModel';

let pd = func => e => {
    e.preventDefault();
    func();
};

export default class ItemButtons extends Component {
    static propTypes = {
        lanes: React.PropTypes.arrayOf(React.PropTypes.instanceOf(LaneModel)),
        index: React.PropTypes.number,
        lane: React.PropTypes.instanceOf(LaneModel),
        onChangeLane: React.PropTypes.func,
        onChangeItemLane: React.PropTypes.func
    };

    onRemove = pd(() => this.props.onChangeLane(LaneModel.removeItem(this.props.lane, this.props.item)));

    onUp = pd(() => this.props.onChangeLane(LaneModel.swapItems(this.props.lane, this.props.index, this.props.index -1)));

    onDown = pd(() => this.props.onChangeLane(LaneModel.swapItems(this.props.lane, this.props.index, this.props.index + 1)));

    render() {
        let {index, lanes, onChangeItemLane} = this.props;
        let total = this.props.lane.items.length;
        let item = this.props.lane.items[index];

        return (
            <div>
                {!index ? null :
                    <button className="btn btn-default" onClick={this.onUp}><i className="glyphicon glyphicon-arrow-up" /></button> }

                {total <= index + 1 ? null :
                    <button className="btn btn-default" onClick={this.onDown}><i className="glyphicon glyphicon-arrow-down" /></button>}

                <span className="dropdown">
                    <button className="btn btn-default dropdown-toggle">Move to<b className="caret" /></button>
                    <ul className="dropdown-menu">
                        {lanes.map(lane =>
                            <li key={lane.title}><a href="#" onClick={pd(onChangeItemLane.bind(this, this.props.lane, lane, item))}>{lane.title}</a></li>
                        )}
                    </ul>
                </span>

                <button className="btn btn-danger pull-right" onClick={this.onRemove}><i className="glyphicon glyphicon-trash" /></button>
            </div>
        );
    }
}
