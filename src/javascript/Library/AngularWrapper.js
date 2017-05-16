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
  render(){
    const { componentList, itemType, handlePageComponentDrag, handleComponentEdit, children, id, subChildren, store, comp, selector} = this.props;
    const angularComponent = `<my-app [name]="hello"></my-app>`;
    return <div
      dangerouslySetInnerHTML={{__html: angularComponent}}
      key={id}
      ref={(domElement) => {console.log(domElement)}}
      >
    </div>;
  }

}
