import React from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
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
    //return canMakeChessMove(item.fromPosition, props.position);
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();

    console.log(clientOffset,componentRect);

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

    // You can do something with it
    console.log("DROP:",item.fromPosition,props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

@DropTarget('generalcomponent', boardTarget, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))
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
    const { isOver, canDrop, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className="board">
        {isOver && canDrop && <div className='green' />}
        {!isOver && canDrop && <div className='yellow' />}
        {isOver && !canDrop && <div className='red' />}
      </div>
    );
  }
}
