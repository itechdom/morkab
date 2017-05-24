import { observable, action } from 'mobx';

export default class AppState {

    @observable items= [];
    @observable renderHeader;

    constructor(initialState) {
        this.items = initialState && initialState.appstate && initialState.appstate.items ? initialState.appstate.items : [];
    }

    @action
    addItem(item: Item) {
        //this is an action yo
        this.items.push(item);
    }

    toJson() {
        return {
            items: this.items
        };
    }
}
