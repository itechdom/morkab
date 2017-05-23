import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Highlight from 'react-highlight';

export default class ExportedPageDialog extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const actions = [
      <RaisedButton
        label="Close"
        primary={false}
        secondary={true}
        onClick={this.props.handleCancel}
      />,
      <RaisedButton
        label="Copy To Clipboard"
        primary={true}
        onClick={this.props.handleCopy}
      />
    ];
    return <div>
      <Dialog width={300} openSecondary={true} open={this.props.open} actions={actions} autoScrollBodyContent={true} >
          <Highlight className="html">
            {
              this.props.exportedPage
            }
          </Highlight>
      </Dialog>
    </div>
  }
}
