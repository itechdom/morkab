import React from 'react';
import * as Material from 'material-ui';

let compList = {
  Material : Material
}

const GeneralComponent = ({
  type,
  properties,
  children,
  library,
  link
}) => {
    let Comp;
    if(library !== "default"){
      Comp = compList[library][type];
    }
    else{
      Comp = type;
    }
    return <div>
      <h1><a target="_blank" href={link}>{type}</a></h1>
      <Comp
        {...properties}
      />
      {children && children.length > 0 ? children.map(child=><GeneralComponent library={child.library} type={child.type} properties={child.properties} children={child.children} />):<div></div>}
    </div>
}

export default GeneralComponent;
