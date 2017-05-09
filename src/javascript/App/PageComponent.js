import React from 'react';
import { DragSource } from 'react-dnd';
import {
  observer
}
from "mobx-react";


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
    const { store, connectDragSource, connectDragPreview, isDragging, element, properties, children, link, handleComponentDrag, tempPosition, id, position } = this.props;
    return connectDragSource(<div><DraggableComponent
      id={id}
      Element={element}
      properties={properties}
      children={children}
      link={link}
      isDragging={isDragging}
      handleComponentDrag={handleComponentDrag}
      tempPosition={tempPosition}
      position={position}
      connectDragPreview={connectDragPreview}
      store={store}
    />
  </div>);
}

}

const DraggableComponent = ({
  id,
  Element,
  properties,
  children,
  link,
  isDragging,
  handleComponentDrag,
  position,
  connectDragPreview,
  store
}) => {
  if(isDragging){
    handleComponentDrag(id,'pagecomponent');
  }
  return <div style={{
    opacity: isDragging ? 0.2 : 1,
    top:position.y,
    left:position.x,
    width:'100%'
  }}>
  <h4><a target="_blank" href={link}>{Element.name}</a></h4>
  {
    connectDragPreview(
      <div>
        <Element
          {...properties}
          key={id}
          store={store}
          id={id}
        />
        {children}
      </div>
    )
  }
</div>
}
