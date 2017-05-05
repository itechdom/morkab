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

@DragSource('generalcomponent', generalComponentSource, collect)
@observer export default class GeneralComponent extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const { connectDragSource, connectDragPreview, isDragging, element , properties, children, library, link, handleComponentDrag, tempPosition, id, component } = this.props;
    return connectDragSource(<div><DraggableComponent
      component={component}
      id={id}
      library={library}
      Element={element}
      properties={properties}
      children={children}
      link={link}
      isDragging={isDragging}
      handleComponentDrag={handleComponentDrag}
      tempPosition={tempPosition}
      connectDragPreview={connectDragPreview}
    />
    </div>);
}

}

const DraggableComponent = ({
  id,
  Element,
  properties,
  children,
  library,
  link,
  isDragging,
  handleComponentDrag,
  connectDragPreview
}) => {
    if(isDragging){
      handleComponentDrag(id,'generalcomponent');
    }
    return <div style={{
        opacity: isDragging ? 0.2 : 1
      }}>
      <h4><a target="_blank" href={link}>{Element.name}</a></h4>
      {
        connectDragPreview(
          <div>
            <Element
              {...properties}
            />
            {children}
          </div>
        )
      }
    </div>
}
