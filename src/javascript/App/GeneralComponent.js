import React from 'react';
import * as Material from 'material-ui';

let compList = {
  Material : Material
}

const GeneralComponent = ({
  type,
  properties,
  children,
  library
}) => {
    let Comp;
    if(library !== "default"){
      Comp = compList[library][type];
    }
    else{
      Comp = type;
    }
    return <div>
      <Comp
        {...properties}
      />
      {children.length > 0 ? children.map(child=><GeneralComponent library={child.library} type={child.type} properties={child.properties} children={child.children} />):<div>No More Children Left</div>}
    </div>
}

export default GeneralComponent;
