//http://www.material-ui.com/#/components/table
export @observer class FlexibleTable extends React.Component {

  state = {
    open: false,
    importedExpense:{}
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render(){
     return <div>
            <Table>
                <TableHeader>
                      <TableRow>
                          <TableHeaderColumn>Date</TableHeaderColumn>
                          <TableHeaderColumn>Amount</TableHeaderColumn>
                          <TableHeaderColumn>File</TableHeaderColumn>
                          <TableHeaderColumn>Tags</TableHeaderColumn>
                          <TableHeaderColumn>Import?</TableHeaderColumn>
                          <TableHeaderColumn>Delete?</TableHeaderColumn>
                      </TableRow>
                </TableHeader>
                <TableBody className="top-1">
                    {
                        this.props.list.map((expense,index) => (
                            <TableRow key={index}>
                              <TableRowColumn>
                                <FormattedDate
                                    value={expense.date}
                                    year='numeric'
                                    month='long'
                                    day='numeric'
                                />
                                </TableRowColumn>
                                <TableRowColumn>{expense.amount}</TableRowColumn>
                                <TableRowColumn>{expense.file}</TableRowColumn>
                                <TableRowColumn>{expense.tags.map((item,index)=>{return<Chip key={index}>{item}</Chip>})}</TableRowColumn>
                                <TableRowColumn><RaisedButton label={`import`} onClick={(event)=>this.props.onExpenseImport(expense)}  /></TableRowColumn>
                                <TableRowColumn>
                                    <RaisedButton
                                        label={"delete"}
                                        secondary={true}
                                        onClick={(event)=>{
                                                this.setState({open:true});
                                                this.setState({importedExpense:expense});
                                            }
                                        }/>
                                </TableRowColumn>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <RaisedButton
                label={`load more ...`}
                onClick={this.props.onNextPage}
            />
            <DeleteExpenseDialog
                open={this.state.open}
                onAgree={()=>{this.props.onExpenseDelete(this.state.importedExpense);this.setState({open:false})}}
                onCancel={()=>this.setState({open:false})}
                expense={this.state.importedExpense}
            />
        </div>
    }

};
