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
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource('pagecomponent', generalComponentSource, collect)
@observer export default class PageComponent extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const { connectDragSource, isDragging, type, properties, children, library, link, handleComponentDrag, tempPosition, id, component } = this.props;
    return connectDragSource(<div><DraggableComponent
      component={component}
      id={id}
      library={library}
      type={type}
      properties={properties}
      children={children}
      link={link}
      isDragging={isDragging}
      handleComponentDrag={handleComponentDrag}
      tempPosition={tempPosition}
    />
    </div>);
}

}

const DraggableComponent = ({
  id,
  type,
  properties,
  children,
  library,
  link,
  isDragging,
  handleComponentDrag
}) => {
    let Comp;
    if(library !== "default"){
      Comp = compList[library][type];
    }
    else{
      Comp = type;
    }
    if(isDragging){
      handleComponentDrag(id,'pagecomponent');
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