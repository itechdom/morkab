import {observable, computed, autorun, action, reaction} from 'mobx';
import * as colors from 'material-ui/styles/colors';
import uuidV4 from 'uuid/v4';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import reactElementToJSXString from 'react-element-to-jsx-string';

export class Morkab {

  @observable componentList = [];
  @observable page = [];
  @observable exportedPage = "";
  @observable exportedPageDialog = false;
  @observable draggedComponent = {};
  @observable editDialogOpen = false;
  @observable edittedComponent = {};
  @observable themeEditorDialogOpen = false;
  @observable themeOptions = {};
  @observable themeValues = {};
  @observable toolboxOpen = 'none';
  @observable libraryList = [];

  constructor() {
    let obj = getMuiTheme({});
    this.themeValues = getMuiTheme({appBar:{
      height:150
    }});
    Object.keys(obj).map((key)=>{
      Object.keys(obj[key]).map((childKey)=>{
        this.themeOptions[`${key}.${childKey}`] = "";
      })
    });
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

  @action exportPage(){
    this.exportedPageDialog = true;
    this.exportedPage = this.toJSX(this.page).join("\n");
  }

  @action updateTheme(key,value){
    try{
      //JSON.parse(`{"value":${value}}`)
      let val = JSON.parse(`{"value":${value}}`).value;
      let keys = key.split(".");
      this.themeValues[keys[0]][keys[1]] = val;
    }catch(err){
      console.log("ERROOOORRR",err);
    }
  }

  @action updateDraggedComponentPosition(position){
    this.draggedComponent.tempPosition = position;
  }

  @action applyDraggedComponentPosition(){
    this.draggedComponent.position = this.draggedComponent.tempPosition;
  }

  @action editComponent(comp){
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
    //to prevent properties from being updated
    let newProp = Object.assign({},properties);
    if(dragType === 'generalcomponent'){
      this.page.push(new Component(element,link,newProp,title,true));
    }
    else if(dragType === 'pagecomponent'){
      this.applyDraggedComponentPosition();
    }
  }

  @action addItemToComponent(item,comp){
    let newProp = Object.assign({},item.properties);
    let childComponent = new Component(item.element,item.link,newProp,true);
    comp.properties.children.push(childComponent);
    comp.subChildren.push(childComponent);
    this.page.remove(item);
  }

  toJSX(page){
    let jsxList = page.map((comp)=>{
      if(comp.subChildren.length > 0){
        let Layout = comp.title;
        let props = comp.properties;
        let childElements = comp.subChildren.map((comp)=>{
          let Element = comp.element;
          return <Element {...comp.properties} />;
        })
        return reactElementToJSXString(<Layout {...props}>{childElements}</Layout>);
      }
      else{
        let Element = comp.element;
        return reactElementToJSXString(<Element {...comp.properties} />);
      }
    });
    return jsxList;
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
