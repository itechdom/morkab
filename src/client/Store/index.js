import {observable, computed, autorun, action, reaction, toJS} from 'mobx';
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
  @observable library = [];
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
  @observable previewMode = false;
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

  @action toggleDraggable(comp){
    comp.draggable = !comp.draggable;
  }

  @action exportPage(){
    this.exportedPageDialog = true;
    let exportedPage = this.page.map((comp)=>{
      return jsxToString(comp);
    });
    this.exportedPage = reactElementToJSXString(<div>{exportedPage.map(el=>el)}</div>);
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

  //parent and child
  @action deleteComponent(comp,parent){
    if(!parent){
      let removed = this.page.remove(comp);
      return removed;
    }
    return parent.properties.children.splice(parent.properties.children.indexOf(comp),1);
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
    let {element,tag,link,properties,serverLink,externalHTML} = this.draggedComponent;
    //to prevent properties from being updated
    let newProp = toJS(properties);
    if(dragType === 'generalcomponent'){
      this.page.push(new Component(element,tag,link,newProp,serverLink,externalHTML));
    }
    else if(dragType === 'pagecomponent'){
      this.applyDraggedComponentPosition();
    }
  }

  @action addItemToComponent(item,comp){
    let newProp = toJS(item.properties);
    let pageComponent = this.page.find(x => x.id === item.id);

    //if we already found a page component, remove it
    if(pageComponent){
      this.page.remove(pageComponent);
    }

    let childComponent = new Component(item.element,item.tag,item.link,newProp,item.serverLink,item.externalHTML);
    comp.properties.children.push(childComponent);
    this.page.remove(item);
  }

  @action togglePreviewMode(){
    this.previewMode = !this.previewMode;
  }

  @action getServerComponent(comp){
    this.pendingRequestCount++;
    let req = superagent.get(`${HOST}/api/v1/react`);
    req.end(action("getAngular-callback",(err,res)=>{
      if(err){
        console.log("err: ",err);
      }
      let response = JSON.parse(res.text);
      this.pendingRequestCount--;
      comp.externalHTML = response.html;
    }));
  }

}

export class Component {
  id;
  element;
  tag;
  link;
  @observable properties;
  serverLink;
  @observable externalHTML;
  library;
  tempPosition;
  @observable position;
  @observable draggable;
  constructor(element,tag,link,properties,serverLink,externalHTML,draggable=false){
    this.id = uuidV4();
    this.tag = tag;
    this.link = link;
    this.properties = properties;
    this.element = element;
    this.serverLink= serverLink;
    this.externalHTML = externalHTML;
    this.position = {};
    this.draggable = draggable;
  }
}
