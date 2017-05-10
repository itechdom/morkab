import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class EditComponentDialog extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let comp = this.props.edittedComponent;
    let properties;
    if(comp && comp.element){
      properties = Object.keys(comp.element.propTypes).map((key)=>{
        return key;
      });
    }
    return <div>
      <Drawer width={300} openSecondary={true} open={this.props.open} >
        <RaisedButton
          label="Toggle Drawer"
          secondary={true}
          onClick={this.props.handleToggle}
        />
        {
          (properties)?properties.map((key)=>{
            return <div>
              <p>{key}:</p>
              <TextField onChange={(event,newValue)=>this.props.handlePropertiesUpdate(key,newValue)} />
            </div>
          }):""
        }
      </Drawer>
    </div>
  }
}
