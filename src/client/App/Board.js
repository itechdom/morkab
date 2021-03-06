import React from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import PageComponent from './PageComponent';
import {
  observer
}
from "mobx-react";

/**
* Specifies the drop target contract.
* All methods are optional.
*/
const boardTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    return true;
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();

    props.handleComponentHover(clientOffset,componentRect);

    let item = monitor.getItem();
    let itemType = monitor.getItemType();

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    // if (monitor.didDrop()) {
    //   // If you want, you can check whether some nested
    //   // target already handled drop
    //   let item = monitor.getItem();
    //   console.log(item);
    //   return;
    // }
    
    // Obtain the dragged item
    const item = monitor.getItem();
    const itemType = monitor.getItemType();
    const delta = monitor.getDifferenceFromInitialOffset();
    
    console.log("item and delta",item,delta);
    
    props.handleComponentDrop(itemType,delta);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

@DropTarget(['generalcomponent','pagecomponent'], boardTarget, (connect, monitor) => {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
})
@observer export default class Board extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }
  render(){
    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { store, isOver, canDrop, connectDropTarget, componentList, itemType, handlePageComponentDrag, handleComponentEdit, toggleDraggable, handleComponentDelete, externalHTML, serverLink, previewMode } = this.props;

    return connectDropTarget(
      <div className="board">
        {isOver && canDrop && <div className='green' />}
        {!isOver && canDrop && <div className='yellow' />}
        {isOver && !canDrop && <div className='red' />}
        {
          componentList.map((comp)=>{
            return <PageComponent
              id={comp.id}
              tag={comp.tag}
              element={comp.element}
              properties={comp.properties}
              position={comp.position}
              draggable={comp.draggable}
              handleComponentDrag={handlePageComponentDrag}
              handleComponentEdit={handleComponentEdit}
              handleComponentDelete={handleComponentDelete}
              toggleDraggable={toggleDraggable}
              store={store}
              comp={comp}
              externalHTML={externalHTML}
              serverLink={serverLink}
              previewMode={previewMode}
            />
          })
        }
      </div>
    );
  }
}
