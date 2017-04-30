import React from 'react';
import * as Material from 'material-ui';
import { DragSource } from 'react-dnd';

let compList = {
  Material : Material
}

const generalComponentSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource('generalcomponent', generalComponentSource, collect)
export default class GeneralComponent extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const { connectDragSource, isDragging, type, properties, children, library, link } = this.props;
    return connectDragSource(<div><RecursiveComponent library={library} type={type} properties={properties} children={children} link={link} /></div>);
  }

}

const RecursiveComponent = ({
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
      {children && children.length > 0 ? children.map(child=><RecursiveComponent library={child.library} type={child.type} properties={child.properties} children={child.children} />):<div></div>}
    </div>
}
