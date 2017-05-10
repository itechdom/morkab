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
    const { store, connectDragSource, connectDragPreview, isDragging, element, properties, link, handleComponentDrag, handleComponentEdit, tempPosition, id, position, subChildren, title } = this.props;
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
  title
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
  <h4 style={{float:'right'}}><a target="_blank" href={link}>{(title)?title:Element.name}</a></h4>
  {
    connectDragPreview(
      <div>
        <RaisedButton style={{float:'right'}} label="Edit" onClick={()=>handleComponentEdit(id)} />
        <Element
          {...properties}
          key={id}
          store={store}
          id={id}
          subChildren={subChildren}
          handleComponentEdit={handleComponentEdit}
        />
      </div>
    )
  }
</div>
}
