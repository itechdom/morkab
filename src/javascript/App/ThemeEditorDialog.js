import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { SketchPicker } from 'react-color';
import {ColorPicker} from './ColorPicker.js';

export default class ThemeEditorDialog extends React.Component{
  state = {
    key:"",
    value:"",
    searchText:""
  }
  constructor(props){
    super(props);
  }
  handleTextChange(key,value){
    this.setState({value:value});
    this.setState({key:key});
  }
  isColor(key){
    let reg = /[cC]olor/;
    return !!key.match(reg);
  }
  render(){
    let options = [];
    if(this.props.themeOptions){
      options = Object.keys(this.props.themeOptions).map((key)=>{
        return key;
      });
    }

    const actions = [
      <RaisedButton
        label="Close"
        primary={false}
        secondary={true}
        onClick={this.props.handleCancel}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={()=>{this.props.handleThemeOptionUpdate(this.state.key,this.state.value)}}
      />
    ];

    return <div>
      <Dialog actions={actions} width={300} openSecondary={true} open={this.props.open} autoScrollBodyContent={true}>
        {
          (options)?options.map((key,index)=>{
            let keys = key.split(".");
            return <div>
              <p>{key}:</p>
              <p>{this.props.themeValues[keys[0]][keys[1]].toString()}</p>
              {
              (this.isColor(key))?<ColorPicker
                  onColorChange={(color)=>{this.handleTextChange(key,`"${color}"`)}}
                />:<TextField id={index} key={index} onChange={(event,newValue)=>this.handleTextChange(key,newValue)} />
              }
            </div>
          }):""
        }
      </Dialog>
    </div>
  }
}
