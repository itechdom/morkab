import React from 'react';
import ReactDOM from 'react-dom';
import {
  observer
}
from "mobx-react";
import {
  Morkab,
  Component
}
from '../Store';
import {
  IntlProvider,
  FormattedDate
}
from 'react-intl';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
  Link
}
from 'react-router-dom'
import Material from 'material-ui';
import Chip from 'material-ui/Chip';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';

import DevTools from 'mobx-react-devtools';

import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';
import '../Style/main.scss';

import data from '../component-list';
import GeneralComponent from './GeneralComponent';
import Board from './Board';
import EditComponentDialog from './EditComponentDialog';
import ThemeEditorDialog from './ThemeEditorDialog';
import ExportedPageDialog from './ExportedPageDialog';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import {Provider, inject} from 'mobx-react';

injectTapEventPlugin();

@inject((allStores) => ({
    store: allStores.userStore
}))
@DragDropContext(HTML5Backend)
@observer class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data:data
    }
  }

  render() {
    return (
        <MuiThemeProvider muiTheme={this.props.store.themeValues}>
          <div>
            <AppBar
              iconElementLeft={<RaisedButton label="Toggle Toolbox"
                    onClick={()=>(this.props.store.toolboxOpen === 'none')?this.props.store.toolboxOpen = 'block':this.props.store.toolboxOpen='none'}
                  />}
              iconElementRight={<RaisedButton label="Edit Global Theme"
                    onClick={()=>this.props.store.themeEditorDialogOpen = true}
                  />}
              style={{textAlign:"center"}}
              title={
                <div>
                  <RaisedButton label="Export Theme" onClick={()=>this.props.store.exportPage()} />
                  <h1 className="title">Morkab</h1>
              </div>}
            />
            <div style={{display:'flex'}}>
              <Paper
                zDepth={3}
                style={{flex:1,padding:10,overflowY:'scroll',overflowX:'hidden',height:1500,display:this.props.store.toolboxOpen}}
                >
                  {
                    this.props.store.componentList.map((comp)=>{
                      return <div style={{marginTop:10}}>
                        <GeneralComponent
                          id={comp.id}
                          element={comp.element}
                          title={comp.title}
                          children={comp.children}
                          subChildren={comp.subChildren}
                          library={comp.library}
                          properties={comp.properties}
                          link={comp.link}
                          handleComponentDrag={(id,type)=>this.props.store.setDraggedComponent(id,type)}
                          store={this.props.store}
                        />
                      </div>
                    })
                  }
                </Paper>
                <div style={{flex:3}}>
                  <Board
                    componentList={this.props.store.page}
                    handlePageComponentDrag={(id,type)=>this.props.store.setDraggedComponent(id,type)}
                    handleComponentHover={(position)=>this.props.store.updateDraggedComponentPosition(position)}
                    handleComponentDrop={(type)=>this.props.store.addComponentToPage(type)}
                    handleComponentEdit={(id,parentId)=>this.props.store.editComponent(id,parentId)}
                    store={this.props.store}
                  />
                </div>
              </div>
              <EditComponentDialog
                open={this.props.store.editDialogOpen}
                edittedComponent={this.props.store.edittedComponent}
                handleToggle={()=>{this.props.store.editDialogOpen = !this.props.store.editDialogOpen}}
                handlePropertiesUpdate={(key,value)=>{this.props.store.applyPropertiesUpdate(key,value)}}
              />
              <ThemeEditorDialog
                open={this.props.store.themeEditorDialogOpen}
                themeOptions={this.props.store.themeOptions}
                themeValues={this.props.store.themeValues}
                handleCancel={()=>this.props.store.themeEditorDialogOpen = false}
                handleThemeOptionUpdate={(key,value)=>{this.props.store.updateTheme(key,value);this.props.store.themeEditorDialogOpen=false}}
              />
              <ExportedPageDialog
                open={this.props.store.exportedPageDialog}
                exportedPage={this.props.store.exportedPage}
                handleCancel={()=>{this.props.store.exportedPageDialog = false}}
              />
            </div>
          </MuiThemeProvider>
      );
    }

  };

  let morkabStore = new Morkab();

  data.map((x,index)=>{
    let comp = new Component(x.element,x.link,x.properties,x.title);
    morkabStore.componentList.push(comp);
  })

  ReactDOM.render(
    <Provider userStore={morkabStore}>
      <IntlProvider locale="en">
        <App />
      </IntlProvider>
    </Provider>
      ,
    document.getElementById('app')
  );
