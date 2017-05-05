import React from 'react';
import { DropTarget } from 'react-dnd';
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
    //const componentRect = findDOMNode(component).getBoundingClientRect();

    //props.handleComponentHover(clientOffset);

    let item = monitor.getItem();
    let itemType = monitor.getItemType();
    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    const itemType = monitor.getItemType();

    props.store.addItemToComponent(item,component);

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
@observer
export class Row extends React.Component{

  render(){
    const { isOver, canDrop, connectDropTarget, componentList, itemType, handlePageComponentDrag, children } = this.props;
    return connectDropTarget(<div style={{display:'flex',backgroundColor:'grey',height:'200px'}}>
    </div>);
  }

}
