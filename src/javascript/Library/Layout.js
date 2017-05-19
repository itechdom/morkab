import React from 'react';
import { DropTarget } from 'react-dnd';
import {RaisedButton} from 'material-ui';
import PageComponent from '../App/PageComponent';
import PropTypes from 'prop-types';
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

    props.store.addItemToComponent(item,props.comp);

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
  static propTypes = {
    direction: PropTypes.string,
    justifyContent: PropTypes.string
  }
  constructor(props){
    super(props);
  }
  render(){
    const { isOver, canDrop, connectDropTarget, componentList, itemType, handlePageComponentDrag, handleComponentEdit, handleComponentDelete, children, id, subChildren, direction, justifyContent, store, comp, level, previewMode} = this.props;
    let minHeight;
    let border = (previewMode)?`none`:`2px solid ${store.levelColors[level]}`;
    let Arr = subChildren.map((Child,index)=>{
      let flexStyle = (Child.properties.style && Child.properties.style.flex)?Child.properties.style.flex:0;
      return <div style={{flex:flexStyle}}>
        <PageComponent
          id={Child.id}
          title={Child.title}
          element={Child.element}
          properties={Child.properties}
          position={Child.position}
          subChildren={Child.subChildren}
          handleComponentDrag={handlePageComponentDrag}
          handleComponentEdit={handleComponentEdit}
          handleComponentDelete={handleComponentDelete}
          store={store}
          comp={Child}
          parent={comp}
          externalHTML={Child.externalHTML}
          serverLink={Child.serverLink}
          previewMode={previewMode}
        />
      </div>
    });
    (subChildren.length>0)?minHeight="0px":minHeight="100px";
    return connectDropTarget(<div key={id} style={{display:'flex', flexDirection:`${direction}`, justifyContent:`${justifyContent}`, border:border, minHeight:`${minHeight}`}}>
      {Arr}
    </div>);
  }

}
