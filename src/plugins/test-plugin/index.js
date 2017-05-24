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
  appstate.renderHeader = () => <div>Heyo</div>;
}
