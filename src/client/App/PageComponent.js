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
    const { store, connectDragSource, connectDragPreview, isDragging, element, properties, draggable, link, handleComponentDrag, handleComponentEdit, handleComponentDelete, toggleDraggable, tempPosition, id, position, title, comp, serverLink, externalHTML, previewMode, parent} = this.props;
    return connectDragSource(<div><DraggableComponent
      id={id}
      key={id}
      title={title}
      Element={element}
      properties={properties}
      link={link}
      isDragging={isDragging}
      handleComponentDrag={handleComponentDrag}
      handleComponentEdit={handleComponentEdit}
      handleComponentDelete={handleComponentDelete}
      toggleDraggable={toggleDraggable}
      tempPosition={tempPosition}
      position={position}
      draggable={draggable}
      connectDragPreview={connectDragPreview}
      store={store}
      comp={comp}
      serverLink={serverLink}
      externalHTML={externalHTML}
      previewMode={previewMode}
      parent={parent}
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
  handleComponentEdit,
  handleComponentDelete,
  toggleDraggable,
  position,
  connectDragPreview,
  store,
  title,
  comp,
  externalHTML,
  serverLink,
  previewMode,
  parent,
  draggable
}) => {
  if(isDragging){
    handleComponentDrag(id,'pagecomponent');
  }
  let style = (draggable)?{
    opacity: isDragging ? 0.2 : 1,
    top:position.y,
    left:position.x,
    position:'absolute',
    zIndex:9999,
    width:(properties.width)?properties.width:'100%',
    height:(properties.height)?properties.height:'auto'
  }:{
    opacity: isDragging ? 0.2 : 1,
    position:'relative',
    width:'100%'
  };
  return <div style={style}>
    {
      connectDragPreview(
        <div style={{display:'relative'}}>
          <Element
            {...properties}
            key={id}
            store={store}
            id={id}
            handleComponentEdit={handleComponentEdit}
            handleComponentDelete={handleComponentDelete}
            comp={comp}
            externalHTML={externalHTML}
            serverLink={serverLink}
            previewMode={previewMode}
          />
          {
            (previewMode)?"":<RaisedButton style={{float:'right',zIndex:999}} secondary={true} label="X" onClick={()=>handleComponentDelete(comp,parent)} />
          }
          {
            (previewMode)?"":<RaisedButton style={{float:'right',zIndex:999}} label="Edit" onClick={()=>handleComponentEdit(comp)} />
          }
          {
            (previewMode)?"":<RaisedButton style={{float:'right',zIndex:999}} label="Drag" onClick={()=>toggleDraggable(comp)} />
          }
        </div>
      )
    }
  </div>
}
