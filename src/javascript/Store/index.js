import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import React from 'react';

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
    let {element,link,properties,dropped} = this.draggedComponent;
    if(dragType === 'generalcomponent'){
      this.page.push(new Component(element,link,properties,true));
    }
    else if(dragType === 'pagecomponent'){
      this.applyDraggedComponentPosition();
    }
  }
  @action addItemToComponent(item,componentId){
    //we have to make sure that we make comp draggable again (pass in the drag source)
    //TODO: replace this with normal data instead of accessing React directly
    let comp = this.page.find((x)=>{
        return x.id === componentId;
    });
    let originalComp = this.componentList.find((x)=>{
      return comp.element.name === x.element.name;
    });
    let childComponent = new Component(item.element,item.link,item.properties,true);
    //console.log(originalComp.properties.children === comp.properties.children);
    comp.properties.children.push(childComponent);
    this.page.remove(item);
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
  constructor(element,link,properties,dropped=false){
    this.id = uuidV4();
    this.position = {};
    this.element = element;
    this.link = link;
    this.properties = properties;
    this.dropped = dropped;
  }
}
