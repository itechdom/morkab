import React from 'react';
import * as Material from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const docWebsite = "http://elemental-ui.com/";

const listData = [
  "item 1",
  "item 2",
  "item 3"
];

const iconData = [
  "restore",
  "favorite"
]

export const wrapper = ({children})=>{return<MuiThemeProvider muiTheme={getMuiTheme()}>{children}</MuiThemeProvider>};

export const componentList = [
];
