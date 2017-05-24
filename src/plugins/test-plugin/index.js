//import other plugins here if you would like
import React from 'react';
export default function testPlugin({
    config,
    db,
    actions,
    Material,
    Grommet,
    appstate
}){
  appstate.renderHeader = (Header,props) => <div>Heyo</div>;
}
