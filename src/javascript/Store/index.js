import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';

export class Morkab {
  @observable components = [];
  constructor() {

  }
  @action addComponent(comp){
    components.push(comp);
  }
}

export class Component {
  @observable id;
  @observable position;
  constructor(date){
    this.id = uuidV4();
  }
}
