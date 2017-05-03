import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';

export class Morkab {
  @observable componentList = [];
  @observable page = [];
  @observable draggedComponent = {};
  constructor() {
  }
  @action setDraggedComponent(id,dragType){
    if(dragType === 'generalcomponent'){
      //we have to find the component
      let comp = this.componentList.find((x)=>{
        return x.id === id ;
      });
      this.draggedComponent = comp;
    }
    else if(dragType === 'pagecomponent'){
      //we have to find the component
      let comp = this.page.find((x)=>{
        return x.id === id ;
      });
      comp.dropped = true;
      console.log(comp);
      this.draggedComponent = comp;
    }
  }
  @action updateDraggedComponentPosition(position){
    this.draggedComponent.tempPosition = position;
  }
  @action applyDraggedComponentPosition(){
    this.draggedComponent.position = this.draggedComponent.tempPosition;
  }
  @action addComponentToPage(dragType){
    let {library,type,link,properties,dropped} = this.draggedComponent;
    if(dragType === 'generalcomponent'){
      this.page.push(new Component(library,type,link,properties,true));
    }
    else if(dragType === 'pagecomponent'){
      this.applyDraggedComponentPosition();
    }
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
