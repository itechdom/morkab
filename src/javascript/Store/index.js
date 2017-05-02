import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';

export class Morkab {
  @observable componentList = [];
  @observable page = [];
  @observable draggedComponent = {};
  constructor() {
  }
  @action setDraggedComponent(type,id){
    //we have to find the component
    let comp = this.componentList.find((x)=>{
      return x.type === type ;
    });
    this.draggedComponent = comp;
  }
  @action updateDraggedComponentPosition(position){
    this.draggedComponent.tempPosition = position;
  }
  @action applyDraggedComponentPosition(){
    this.draggedComponent.position = this.draggedComponent.tempPosition;
  }
  @action addComponentToPage(){
    //already there
    //let foundComponent = this.page.find(this.draggedComponent);
    let {library,type,link,properties,dropped} = this.draggedComponent;
    (dropped)?this.applyDraggedComponentPosition():this.page.push(new Component(library,type,link,properties,true));
  }
}

export class Component {
  id;
  tempPosition;
  @observable position;
  library;
  type;
  link;
  properties;
  constructor(library,type,link,properties,dropped=false){
    this.id = uuidV4();
    this.position = {};
    this.library = library;
    this.type = type;
    this.link = link;
    this.properties = properties;
    this.dropped = dropped;
  }
}
