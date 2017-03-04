export default class LaneModel {
    constructor(title, items){
        this.title = title || '';
        this.items = items || [];
    }

    addItem(item){
        this.items.push(item);
    }

    removeItem(item){
        let idx = this.items.indexOf(item);

        if (idx > -1){
            this.items.splice(idx, 1);
        }
    }

    swapOrder(indexA, indexB){
        let a = this.items[indexA];
        this.items[indexA] = this.items[indexB];
        this.items[indexB] = a;
    }

    checkValid() {
        console.log(this);
        if (!this.title) {
            throw new Error('Title is Required!');
        }

        if (this.items.constructor !== Array){
            throw new Error('Items must be Array!');
        }
    }

}
