import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {ColorPicker} from './ColorPicker.js';

export default class EditComponentDialog extends React.Component{
  constructor(props){
    super(props);
  }
  isColor(key){
    let reg = /[cC]olor/;
    return !!key.match(reg);
  }
  render(){
    let comp = this.props.edittedComponent;
    let properties;
    if(comp && comp.element){
      let propTypes = (comp.element.DecoratedComponent)?comp.element.DecoratedComponent.propTypes:comp.element.propTypes;
      properties = Object.keys(propTypes).map((key)=>{
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
          (properties)?properties.map((key,index)=>{
            return <div>
              <p>{key}:</p>
              {
                (this.isColor(key))?<ColorPicker
                  onColorChange={(color)=>{this.props.handlePropertiesUpdate(key,`"${color}"`)}}
                  key={index}
                />:<TextField
                  id={index}
                  onChange={(event,newValue)=>this.props.handlePropertiesUpdate(key,newValue)}
                />
              }
            </div>
          }):""
        }
      </Drawer>
    </div>
  }
}
