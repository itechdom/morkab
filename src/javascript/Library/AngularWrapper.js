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
    //bootstrap angular? or just change the input value and let the angualr app do the rest?
  }
  render(){
    const { componentList, itemType, handlePageComponentDrag, handleComponentEdit, children, id, subChildren, store, comp, selector} = this.props;
    return <div key={id}>
      <my-app></my-app>
    </div>;
  }

}
