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
    const { store, connectDragSource, connectDragPreview, isDragging, element ,properties, link, handleComponentDrag, tempPosition, id, tag, comp, serverLink, externalHTML} = this.props;
    return connectDragSource(<div><DraggableComponent
      id={id}
      key={id}
      tag={tag}
      Element={element}
      properties={properties}
      link={link}
      isDragging={isDragging}
      handleComponentDrag={handleComponentDrag}
      tempPosition={tempPosition}
      connectDragPreview={connectDragPreview}
      store={store}
      comp={comp}
      serverLink={serverLink}
      externalHTML={externalHTML}
    />
    </div>);
}

}

const DraggableComponent = ({
  id,
  Element,
  properties,
  link,
  isDragging,
  handleComponentDrag,
  connectDragPreview,
  store,
  tag,
  comp,
  serverLink,
  externalHTML
}) => {
    if(isDragging){
      handleComponentDrag(id,'generalcomponent');
    }
    return <div style={{
        opacity: isDragging ? 0.2 : 1
      }}>
      <h4><a target="_blank" href={link}>{tag}</a></h4>
      {
        connectDragPreview(
          <div>
            <Element
              {...properties}
              store={store}
              key={id}
              id={id}
              comp={comp}
              serverLink={serverLink}
              externalHTML={externalHTML}
              previewMode={false}
            />
          </div>
        )
      }
    </div>
}
