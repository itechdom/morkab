import React from 'react';

let count = 0;

export let jsxToString = (comp) => {
    if(comp.subChildren && comp.subChildren.length > 0){
      console.log("is parent",comp);
      let Layout = comp.title;
      let props = comp.properties;
      let childElements = comp.subChildren.map((child)=>{
        return jsxToString(child);
      })
      return <Layout {...props}>{childElements}</Layout>;
    }
    let Element = comp.element;
    return <Element {...comp.properties} />;
}
