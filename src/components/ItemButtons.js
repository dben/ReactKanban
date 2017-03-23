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
        total: React.PropTypes.number,
        onRemove: React.PropTypes.func,
        onReorder: React.PropTypes.func,
        onChangeItemLane: React.PropTypes.func
    };

    render() {
        let {index,total,lanes, onReorder, onRemove, onChangeItemLane} = this.props;
        let up = pd(onReorder.bind(this, index, index - 1));
        let down = pd(onReorder.bind(this, index, index +1));
        let remove = pd(onRemove);

        return (
            <div>
                {!index ? null :
                    <button className="btn btn-default" onClick={up}><i className="glyphicon glyphicon-arrow-up" /></button> }

                {total <= index + 1 ? null :
                    <button className="btn btn-default" onClick={down}><i className="glyphicon glyphicon-arrow-down" /></button>}

                <span className="dropdown">
                    <button className="btn btn-default dropdown-toggle">Move to<b className="caret" /></button>
                    <ul className="dropdown-menu">
                        {lanes.map(lane =>
                            <li key={lane.title}><a href="#" onClick={pd(onChangeItemLane.bind(this, index, lane))}>{lane.title}</a></li>
                        )}
                    </ul>
                </span>

                <button className="btn btn-danger pull-right" onClick={remove}><i className="glyphicon glyphicon-trash" /></button>

            </div>
        );
    }
}
