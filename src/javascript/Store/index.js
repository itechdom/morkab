import {observable, computed, autorun, action, reaction} from 'mobx';
import uuidV4 from 'uuid/v4';
import React from 'react';

export class Morkab {
  @observable componentList = [];
  @observable page = [];
  @observable draggedComponent = {};
  @observable editDialogOpen = false;
  @observable edittedComponent = {};
  constructor() {
  }

  @action setDraggedComponent(id,dragType){
    if(dragType === 'generalcomponent'){
      //we have to find the component
      let comp = this.componentList.find((x)=>{
        return x.id === id;
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

  @action editComponent(componentId,parentId){
    let id = (parentId)?parentId:componentId;
    //you are a layout component
    let comp = this.page.find((x)=>{
        return x.id === id;
    });
    if(parentId){
      comp = comp.subChildren.find((x)=>{
        return x.id === componentId;
      });
    }
    this.edittedComponent = comp;
    this.editDialogOpen = true;
  }

  @action applyPropertiesUpdate(key,value){
    try{
      //JSON.parse(`{"value":${value}}`)
      let val = JSON.parse(`{"value":${value}}`).value;
      this.edittedComponent.properties[key] = val;
    }catch(err){
      console.log("ERROOOORRR",err);
    }
  }

  @action addComponentToPage(dragType){
    let {element,link,properties,dropped,title} = this.draggedComponent;
    if(dragType === 'generalcomponent'){
      this.page.push(new Component(element,link,properties,title,true));
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
    comp.properties.children.push(childComponent);
    comp.subChildren.push(childComponent);
    this.page.remove(item);
  }

}

export class Component {
  id;
  title;
  tempPosition;
  @observable position;
  library;
  element;
  link;
  properties;
  subChildren;
  constructor(element,link,properties={},title,dropped=false,subChildren=[]){
    this.id = uuidV4();
    this.position = {};
    this.element = element;
    this.link = link;
    this.properties = properties;
    this.dropped = dropped;
    this.subChildren = subChildren;
    this.title = title;
  }
}
