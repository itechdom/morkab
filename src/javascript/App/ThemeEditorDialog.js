import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class ThemeEditorDialog extends React.Component{
  constructor(props){
    super(props);
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
      />
    ];

    return <div>
      <Dialog actions={actions} width={300} openSecondary={true} open={this.props.open} autoScrollBodyContent={true}>
        {
          (options)?options.map((key)=>{
            return <div>
              <p>{key}:</p>
              <TextField onChange={(event,newValue)=>this.props.handleThemeOptionUpdate(key,newValue)} />
            </div>
          }):""
        }
      </Dialog>
    </div>
  }
}
