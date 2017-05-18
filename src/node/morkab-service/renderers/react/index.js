let ReactDOMServer = require('react-dom/server');
import React from 'react';

export function reactRenderer({
  componentList,
  wrapper
}){
  return componentList.map((comp)=>{
    //if the library isn't installed, install it?
    //installLibrary()
    let Comp = comp.element;
    let Wrapper = wrapper;
    return ReactDOMServer.renderToString(
      <Wrapper>
        <Comp {...comp.properties} />
      </Wrapper>
    );
  })
}
