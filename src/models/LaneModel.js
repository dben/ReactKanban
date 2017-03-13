export default class LaneModel {
    constructor(title, items){
        this.title = title || '';
        this.items = items || [];
    }

    static addItem(lane, item){
        return new LaneModel(lane.title, [
            ...lane.items,
            item
        ]);
    }

    static removeItem(lane, item){
        return new LaneModel(lane.title, lane.items.filter(x => x !== item));
    }

    static changeItem(lane, idx ,item){
        return new LaneModel(lane.title, [
            ...lane.items.slice(0, idx),
            item,
            ...lane.items.slice(idx + 1)
        ]);
    }

    static swapOrder(lane, indexA, indexB){
        return new LaneModel(lane.title, lane.items.map((item, idx) => {
            if (idx === indexA){
                return lane.items[indexB]
            } else if (idx === indexB){
                return lane.items[indexA]
            } else {
                return item;
            }
        }));
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
