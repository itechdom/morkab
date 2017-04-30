import React from 'react';
import * as Material from 'material-ui';

let compList = {
  Material : Material
}

const UIElement = ({
  type,
  properties,
  children,
  library
}) => {
  let Comp = compList[library][type];
  let childrenElements;
  if(Array.isArray(children)){
    childrenElements = children.map((child)=>{
      let Child = compList[child.library][child.type];
      return <Child
        {...child.properties}
      />
    });
  }
  //maybe I have to do React element.create to create the element
  return <div>
    <h1>{type}</h1>
    <Comp
      {...properties}
      >
        {childrenElements}
      </Comp>
    </div>
  }

  export default UIElement;
