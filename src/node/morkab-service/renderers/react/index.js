let ReactDOMServer = require('react-dom/server');
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export function reactRenderer({
  componentList
}){
  return componentList.map((comp)=>{
    let Comp = comp.element;
    return ReactDOMServer.renderToString(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Comp {...comp.properties} />
      </MuiThemeProvider>
    );
  })
}
