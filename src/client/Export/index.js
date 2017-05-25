import React from 'react';

export let jsxToString = (comp) => {
    if(comp.properties.children && comp.properties.children.length > 0){
      let Layout = comp.tag;
      let props = comp.properties;
      let childElements = comp.properties.children.map((child)=>{
        return jsxToString(child);
      })
      return <Layout {...props}>{childElements}</Layout>;
    }
    let Element = comp.element;
    return <Element {...comp.properties} />;
}
