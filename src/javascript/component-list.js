import React from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const docWebsite = "http://www.material-ui.com/#/components/";

const listData = [
  "item 1",
  "item 2",
  "item 3"
];

const iconData = [
  "restore",
  "favorite"
]

export default [
  {
    "library":"Material",
    "type":"AppBar",
    "link":`${docWebsite}app-bar`,
    "properties":{
      "title":"hello",
      iconElementRight:<FlatButton label="Save" />
    }
  },
  {
    "library":"Material",
    "type":"AutoComplete",
    "properties":{
      "dataSource":["Anas","Becky","Chaim David","David","Evalyn","Fouad"]
    }
  },
  {
    "library":"Material",
    "type":"Avatar",
    "properties":{
      icon:<FontIcon className="material-icons">folder</FontIcon>
    }
  },
  {
    "library":"Material",
    "type":"Badge",
    "properties":{
      "badgeContent":1,
      primary:true,
      children:<NotificationsIcon />
    }
  },
  {
    "library":"Material",
    "type":"BottomNavigation",
    "properties":{
      selectedIndex:0,
      children:iconData.map((x,index) => <BottomNavigationItem style={{marginTop:0}} label={x} icon={<FontIcon className="material-icons">{x}</FontIcon>}></BottomNavigationItem>)
    }
  },
  {
    "library":"Material",
    "type":"FlatButton",
    "properties":{
      "label":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Card",
    "properties":{
      children:[(<CardHeader
        title="URL Avatar"
        subtitle="Subtitle"
        avatar="images/jsa-128.jpg"
      />),
      (<CardMedia
        overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="images/nature-600-337.jpg" />
        </CardMedia>),
        (<CardTitle title="Card title" subtitle="Card subtitle" />),
        (<CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>),
        (<CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>)]
      }
  },
  {
    "library":"Material",
    "type":"Chip",
    "properties":{
      children:"hello"
    }
  },
  {
    "library":"Material",
    "type":"DatePicker",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Divider",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"List",
    "properties":{
      "title":"hello",
      "children":iconData.map((x,index) => <ListItem primaryText={x} leftIcon={<FontIcon className="material-icons">{x}</FontIcon>} />)
    }
  },
  {
    "library":"Material",
    "type":"IconMenu",
    "properties":{
      iconButtonElement:<FontIcon className="material-icons">add</FontIcon>,
      anchorOrigin:{horizontal: 'left', vertical: 'top'},
      targetOrigin:{horizontal: 'left', vertical: 'top'},
      children:listData.map((x,index) => <MenuItem primaryText={x} />)
    }
  },
  {
    "library":"Material",
    "type":"DropDownMenu",
    "properties":{
      value:1,
      children:listData.map((x,index) => <MenuItem value={index} primaryText={x} />)
    }
  },
  {
    "library":"Material",
    "type":"CircularProgress",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"SelectField",
    "properties":{
      floatingLabelText:"floatingLabelText",
      value:1,
      children:listData.map((x,index) => <MenuItem value={index} primaryText={x} />)
    }
  },
  {
    "library":"Material",
    "type":"Slider",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Checkbox",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Stepper",
    "properties":{
      activeStep:1,
      children:listData.map((x,index)=><Step><StepLabel>{x}</StepLabel></Step>)
    }
  },
  {
    "library":"Material",
    "type":"Table",
    "properties":{
      children:[
        (<TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        ),
        (
        <TableBody>
          <TableRow>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>John Smith</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>2</TableRowColumn>
            <TableRowColumn>Randal White</TableRowColumn>
            <TableRowColumn>Unemployed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>3</TableRowColumn>
            <TableRowColumn>Stephanie Sanders</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
        </TableBody>
        )
    ]
  }
},
{
  "library":"Material",
  "type":"Tabs",
  "properties":{
    children:listData.map((x,index) => <Tab label={x} >
    </Tab>)
  }
},
{
  "library":"Material",
  "type":"TextField",
  "properties":{
    "title":"hello"
  }
},
{
  "library":"Material",
  "type":"TimePicker",
  "properties":{
    "title":"hello"
  }
},
{
  "library":"Material",
  "type":"Toolbar",
  "properties":{
    "title":"hello"
  }
},
];
