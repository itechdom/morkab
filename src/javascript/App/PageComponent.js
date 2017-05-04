import React from 'react';
import * as Material from 'material-ui';
import * as Layout from '../Library/Layout.js';
import { DragSource } from 'react-dnd';
import {
  observer
}
from "mobx-react";

let compList = {
  Material,
  Layout
}

const generalComponentSource = {
  beginDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

@DragSource('pagecomponent', generalComponentSource, collect)
@observer export default class PageComponent extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const { connectDragSource, connectDragPreview, isDragging, type, properties, children, library, link, handleComponentDrag, tempPosition, id, component, position } = this.props;
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
      position={position}
      connectDragPreview={connectDragPreview}
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
  handleComponentDrag,
  position,
  connectDragPreview
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
    opacity: isDragging ? 0.2 : 1,
    position:'absolute',
    top:position.y,
    left:position.x,
    width:'100%'
  }}>
  <h4><a target="_blank" href={link}>{type}</a></h4>
  {
    connectDragPreview(
      <div>
        <Comp
          {...properties}
        />
        {children}
      </div>
    )
  }
</div>
}
