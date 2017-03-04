import React, { Component} from 'react';
import ItemModel from '../models/ItemModel';

class Item extends Component {
    static propTypes = {
        value: React.PropTypes.instanceOf(ItemModel),
        onChange: React.PropTypes.func,
    };

    onChange = e => {
        let item = this.props.value;
        let name = e.target.name;
        let val = e.target.value;

        item[name] = val;

        this.props.onChange(item);
    };

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={this.props.value.title} name="title" onChange={this.onChange} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea type="text" className="form-control" value={this.props.value.description} name="description" onChange={this.onChange} />
                </div>
            </div>
        );
    }
}

export default Item;
