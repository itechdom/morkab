import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';

export class Morkab {
  @observable componentList = [];
  @observable page = [];
  @observable draggedComponent = {};
  constructor() {
  }
  @action setDraggedComponent(type){
    //we have to find the component
    let comp = this.componentList.find((x)=>{
      return x.type === type;
    })
    this.draggedComponent = comp;
  }
  @action updateDraggedComponentPosition(position){
    this.draggedComponent.position = position;
  }
  @action addComponentToPage(){
    this.page.push(this.draggedComponent);
  }
}

export class Component {
  id;
  @observable position;
  library;
  type;
  link;
  properties;
  constructor(library,type,link,properties){
    this.id = uuidV4();
    this.position = {};
    this.library = library;
    this.type = type;
    this.link = link;
    this.properties = properties;
  }
}
