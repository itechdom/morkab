import {observable, computed, autorun, action, reaction} from 'mobx';
import * as colors from 'material-ui/styles/colors';
import uuidV4 from 'uuid/v4';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {jsxToString} from '../Export';
import reactElementToJSXString from 'react-element-to-jsx-string';
import superagent from 'superagent';
import {HOST} from  "../.config.js";

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
  @observable levelColors = [
    "#00ff00",
    "#9966ff",
    "#ffcc66",
    "#000099",
    "#999966"
  ]

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
    let exportedPage = this.page.map((comp)=>{
      return jsxToString(comp);
    });
    this.exportedPage = reactElementToJSXString(exportedPage[0]);
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

  @action deleteComponent(){
    let removed = this.page.remove(this.edittedComponent);
    if(!removed){
      this.page.map((comp)=>{
        this.recursiveDelete(comp,this.edittedComponent);
      })
    }
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
    let {element,link,properties,dropped,title,serverLink,externalHTML,tag} = this.draggedComponent;
    //to prevent properties from being updated
    let newProp = Object.assign({},properties);
    if(dragType === 'generalcomponent'){
      this.page.push(new Component(element,link,newProp,title,serverLink,externalHTML,tag));
    }
    else if(dragType === 'pagecomponent'){
      this.applyDraggedComponentPosition();
    }
  }

  @action addItemToComponent(item,comp){
    let newProp = Object.assign({},item.properties);
    let childComponent = new Component(item.element,item.link,newProp,item.title);
    comp.properties.children.push(childComponent);
    comp.subChildren.push(childComponent);
    this.page.remove(item);
  }

  @action getServerComponent(comp){
    this.pendingRequestCount++;
    let req = superagent.get(`${HOST}/api/v1/angular`);
    req.end(action("getAngular-callback",(err,res)=>{
      if(err){
        console.log("err: ",err);
      }
      let html = JSON.parse(res.text);
      console.log(html);
    }));
  }

  recursiveDelete(comp,removedComponent){
    let removed = comp.subChildren.splice(comp.subChildren.indexOf(removedComponent),1);
    if(!removed){
      return this.recursiveDelete(nextComp);
    }
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
  @observable externalHTML;
  serverLink;
  tag;
  constructor(element,link,properties={},title,serverLink,externalHTML,tag,subChildren=[]){
    this.id = uuidV4();
    this.position = {};
    this.element = element;
    this.link = link;
    this.properties = properties;
    this.subChildren = subChildren;
    this.title = title;
    this.serverLink= serverLink;
    this.externalHTML = externalHTML;
    this.tag = tag;
  }
}
