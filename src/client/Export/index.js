import React from 'react';

let count = 0;

export let jsxToString = (comp) => {
    if(comp.properties.children && comp.properties.children.length > 0){
      let Layout = comp.title;
      let props = comp.properties;
      let childElements = comp.properties.children.map((child)=>{
        return jsxToString(child);
      })
      return <Layout {...props}>{childElements}</Layout>;
    }
    let Element = comp.element;
    return <Element {...comp.properties} />;
}
