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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as colors from 'material-ui/styles/colors';
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

import DevTools from 'mobx-react-devtools';

import injectTapEventPlugin from 'react-tap-event-plugin';

import 'normalize.css';
import '../Style/main.scss';

import data from '../component-list';
import GeneralComponent from './GeneralComponent';
import Board from './Board';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import {Provider, inject} from 'mobx-react';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto,sans-serif',
  palette: {
    primary1Color: colors.grey900,
    primary2Color: colors.teal500,
    primary3Color: colors.grey400,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    pickerHeaderColor: colors.cyan500,
    shadowColor: colors.fullBlack
  },
  appBar: {
    height: 'auto'
  },
  tabs: {
    backgroundColor: colors.grey700
  }
});

const styles = {
  title: {
    margin: '1em 0'
  },
  subTitle: {
    fontFamily: 'Roboto Slab',
    margin: '0 0 1em 0'
  },
  ctaButton: {
    width: '200px'
  },
  channels: {
    color: colors.deepPurple900
  }
};

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
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AppBar
              iconElementLeft={<span></span>}
              style={{textAlign:"center"}}
              title={
                <div style={styles.title}><h1 className="title">Morkab</h1>
              </div>}
            />
            <div style={{display:'flex'}}>
              <Paper
                zDepth={3}
                style={{flex:1,padding:10,overflowY:'scroll',overflowX:'hidden',height:800}}
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
                    store={this.props.store}
                  />
                </div>
              </div>
              <DevTools />
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
