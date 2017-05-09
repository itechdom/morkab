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
    const { store, connectDragSource, connectDragPreview, isDragging, element , properties, children, link, handleComponentDrag, tempPosition, id, subChildren} = this.props;
    return connectDragSource(<div><DraggableComponent
      id={id}
      key={id}
      Element={element}
      properties={properties}
      children={children}
      link={link}
      isDragging={isDragging}
      handleComponentDrag={handleComponentDrag}
      tempPosition={tempPosition}
      connectDragPreview={connectDragPreview}
      store={store}
      subChildren={subChildren}
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
  connectDragPreview,
  store,
  subChildren
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
              store={store}
              key={id}
              id={id}
              subChildren={subChildren}
            />
          </div>
        )
      }
    </div>
}
