import React from 'react';
import { DropTarget } from 'react-dnd';
import {RaisedButton} from 'material-ui';
import PropTypes from 'prop-types';
import {
  observer
}
from "mobx-react";

@observer
export class External extends React.Component{
  static propTypes = {
  }
  constructor(props){
    super(props);
  }
  render(){
    const { handlePageComponentDrag, handleComponentEdit, children, id, subChildren, store, comp} = this.props;
    if(comp.serverLink && comp.externalHTML===""){
      store.getServerComponent(comp);
    }
    return <div dangerouslySetInnerHTML={{__html: comp.externalHTML}}></div>
  }
}
