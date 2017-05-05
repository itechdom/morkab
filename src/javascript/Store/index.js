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
    let {library,element,link,properties,dropped} = this.draggedComponent;
    if(dragType === 'generalcomponent'){
      this.page.push(new Component(library,element,link,properties,true));
    }
    else if(dragType === 'pagecomponent'){
      this.applyDraggedComponentPosition();
    }
  }
  @action addComponentToComponent(comp){
    //get the draggedComponent and comp (drop target)
    //and add the former to children list of comp
    let component = this.page.find((x)=>{
      return x.id === comp.id ;
    });
    //we have to make sure that we make comp draggable again (pass in the drag source)
    component.properties.children.push(comp);
    this.page.remove(component);
  }
}

export class Component {
  id;
  tempPosition;
  @observable position;
  library;
  element;
  link;
  properties;
  constructor(library,element,link,properties,dropped=false){
    this.id = uuidV4();
    this.position = {};
    this.library = library;
    this.element = element;
    this.link = link;
    this.properties = properties;
    this.dropped = dropped;
  }
}
