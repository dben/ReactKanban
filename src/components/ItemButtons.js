import React, { Component} from 'react';
import LaneModel from '../models/LaneModel';

export default class ItemButtons extends Component {
    static propTypes = {
        lanes: React.PropTypes.arrayOf(React.PropTypes.instanceOf(LaneModel)),
        index: React.PropTypes.number,
        total: React.PropTypes.number,
        onRemove: React.PropTypes.func,
        onReorder: React.PropTypes.func,
        onChangeItemLane: React.PropTypes.func
    };

    pd = func => e => {
        e.preventDefault();
        func();
    };

    render() {
        let {index, total, lanes} = this.props;

        let onUp = this.pd(this.props.onReorder.bind(this, index, index - 1));
        let onDown = this.pd(this.props.onReorder.bind(this, index, index + 1));
        let onRemove = this.pd(this.props.onRemove.bind(this, index));

        return (
           <div>
                {index === 0 ? null :
                    <button className="btn btn-default" onClick={onUp}><i className="glyphicon glyphicon-arrow-up" /></button>
                }

                {total <= index+1 ? null :
                    <button className="btn btn-default" onClick={onDown}><i className="glyphicon glyphicon-arrow-down" /></button>
                }

                <span className="dropdown">
                    <button className="dropdown-toggle btn btn-default">Move to <b className="caret" /></button>
                    <ul className="dropdown-menu">
                        {lanes.map(lane =>
                            <li key={lane.title}><a href="#" onClick={this.pd(this.props.onChangeItemLane.bind(this, index, lane))}>{lane.title}</a></li>
                        )}
                    </ul>
                </span>

                <button className="btn btn-danger pull-right" onClick={onRemove}><i className="glyphicon glyphicon-trash" /></button>
            </div>
        );
    }
}
