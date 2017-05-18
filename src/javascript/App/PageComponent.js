import React from 'react';
import {RaisedButton} from 'material-ui';
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
    const { store, connectDragSource, connectDragPreview, isDragging, element, properties, link, handleComponentDrag, handleComponentEdit, tempPosition, id, position, subChildren, title, comp, serverLink, externalHTML} = this.props;
    return <div><DraggableComponent
      id={id}
      key={id}
      title={title}
      Element={element}
      properties={properties}
      link={link}
      isDragging={isDragging}
      handleComponentDrag={handleComponentDrag}
      handleComponentEdit={handleComponentEdit}
      tempPosition={tempPosition}
      position={position}
      connectDragPreview={connectDragPreview}
      store={store}
      subChildren={subChildren}
      comp={comp}
      serverLink={serverLink}
      externalHTML={externalHTML}
    />
  </div>;
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
  handleComponentEdit,
  position,
  connectDragPreview,
  store,
  subChildren,
  title,
  comp,
  externalHTML,
  serverLink
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
  {
    connectDragPreview(
      <div>
        <Element
          {...properties}
          key={id}
          store={store}
          id={id}
          subChildren={subChildren}
          handleComponentEdit={handleComponentEdit}
          comp={comp}
          externalHTML={externalHTML}
          serverLink={serverLink}
        />
        <RaisedButton style={{float:'right',zIndex:999}} label="Edit" onClick={()=>handleComponentEdit(comp)} />
      </div>
    )
  }
</div>
}
