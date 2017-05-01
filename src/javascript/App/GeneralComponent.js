import React from 'react';
import * as Material from 'material-ui';
import { DragSource } from 'react-dnd';
import {
  observer
}
from "mobx-react";

let compList = {
  Material
}

const generalComponentSource = {
  beginDrag(props) {
    return {
      type:props.type
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource('generalcomponent', generalComponentSource, collect)
@observer export default class GeneralComponent extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const { connectDragSource, isDragging, type, properties, children, library, link } = this.props;
    return connectDragSource(<div><DraggableComponent library={library} type={type} properties={properties} children={children} link={link} isDragging={isDragging} /></div>);
  }

}

const DraggableComponent = ({
  type,
  properties,
  children,
  library,
  link,
  isDragging
}) => {
    let Comp;
    if(library !== "default"){
      Comp = compList[library][type];
    }
    else{
      Comp = type;
    }
    return <div style={{
        opacity: isDragging ? 0.2 : 1
      }}>
      <h1><a target="_blank" href={link}>{type}</a></h1>
      <Comp
        {...properties}
      />
      {children}
    </div>
}
