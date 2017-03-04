import React, { Component} from 'react';
import Item from './Item';
import ItemModel from '../models/ItemModel';

class AddItem extends Component {
    constructor(){
        super();
        this.state = {
            item: new ItemModel()
        }
    }

    static propTypes = {
        onAdd: React.PropTypes.func
    };

    onChange = item => {
        this.setState({item})
    };

    onSubmit = e => {
        e.preventDefault();
        let item = this.state.item;

        try {
            item.checkValid();
        }catch(err){
            alert(err);
            return;
        }

        this.props.onAdd(item);

        this.setState({
            item: new ItemModel()
        });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="lane-item">
                <Item value={this.state.item} onChange={this.onChange} />
                <input type="submit" className="btn btn-primary" value="Add Item" />
            </form>
        );
    }
}

export default AddItem;
