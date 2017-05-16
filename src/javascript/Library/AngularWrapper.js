import React from 'react';
import { DropTarget } from 'react-dnd';
import {RaisedButton} from 'material-ui';
import PropTypes from 'prop-types';
import {
  observer
}
from "mobx-react";

@observer
export class AngularWrapper extends React.Component{
  static propTypes = {
    selector: PropTypes.string
  }
  constructor(props){
    super(props);
  }
  renderAngular(selector){
    //bootstrap
  }
  render(){
    const { componentList, itemType, handlePageComponentDrag, handleComponentEdit, children, id, subChildren, store, comp, selector} = this.props;
    let Arr = subChildren.map((Child,index)=>{
      let flexStyle = (Child.properties.style && Child.properties.style.flex)?Child.properties.style.flex:0;
      return <div style={{flex:flexStyle}}>
        <Child.element
          key={Child.id}
          id={Child.id}
          {...Child.properties}
          subChildren={Child.subChildren}
          store={store}
          comp={Child}
          handleComponentEdit={handleComponentEdit}

        />
        <RaisedButton style={{float:'right',zIndex:999}} label="Edit" onClick={()=>handleComponentEdit(Child)} />
      </div>
    });
    return <div key={id} style={{display:'flex', flexDirection:'column', border:`2px solid black`, minHeight:`${minHeight}`}}>
      {Arr}
    </div>;
  }

}
