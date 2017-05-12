import reactElementToJSXString from 'react-element-to-jsx-string';

let count = 0;

export let jsxToString = (comp) => {
    if(count > 50){
      return;
    }
    if(comp.subChildren.length > 0){
      console.log("found it");
      let Layout = comp.title;
      let props = comp.properties;
      let childElements = comp.subChildren.map((comp)=>{
        let Element = comp.element;
        return <Element {...comp.properties} />;
      })
      comp.element = <Layout {...props}>{childElements}</Layout>;
      count++;
      return jsxToString(comp);
    }
    let Element = comp.element;
    return reactElementToJSXString(<Element {...comp.properties} />);
}
