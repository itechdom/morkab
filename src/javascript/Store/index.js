import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';

export class Morkab {
  @observable componentList = [];
  @observable draggedComponent = {};
  constructor() {
  }
  @action addComponent(comp){
    components.push(comp);
  }
  @action setDraggedComponent(comp){
    console.log("setting dragged component",comp);
    this.draggedComponent = comp;
  }
  @action setDroppedComponent(){
  }
}

export class Component {
  id;
  position;
  constructor(date){
    this.id = uuidV4();
  }
}
