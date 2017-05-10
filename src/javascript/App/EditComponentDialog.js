import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

export default class EditComponentDialog extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props.edittedComponent);
    return <div>
      <Drawer width={300} openSecondary={true} open={this.props.open} >
        <RaisedButton
          label="Toggle Drawer"
          secondary={true}
          onClick={this.props.handleToggle}
        />
      </Drawer>
    </div>
  }
}
