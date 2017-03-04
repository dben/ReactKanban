export default class ItemModel {
    constructor(title, description){
        this.title = title || '';
        this.description = description || '';
    }

    checkValid() {
        console.log(this);
        if (!this.title) {
            throw new Error('Title is Required!');
        }
    }

}
