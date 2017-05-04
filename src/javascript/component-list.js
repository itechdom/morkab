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
    "link":`${docWebsite}auto-complete`,
    "type":"AutoComplete",
    "properties":{
      "dataSource":["Anas","Becky","Chaim David","David","Evalyn","Fouad"]
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}avatar`,
    "type":"Avatar",
    "properties":{
      icon:<FontIcon className="material-icons">folder</FontIcon>
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}badge`,
    "type":"Badge",
    "properties":{
      "badgeContent":1,
      primary:true,
      children:<NotificationsIcon />
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}bottom-navigation`,
    "type":"BottomNavigation",
    "properties":{
      selectedIndex:0,
      children:iconData.map((x,index) => <BottomNavigationItem style={{marginTop:0}} label={x} icon={<FontIcon className="material-icons">{x}</FontIcon>}></BottomNavigationItem>)
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}flat-button`,
    "type":"FlatButton",
    "properties":{
      "label":"hello"
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}flat-button`,
    "type":"RaisedButton",
    "properties":{
      "label":"primary",
      "primary":true
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}flat-button`,
    "type":"RaisedButton",
    "properties":{
      "label":"secondary",
      "secondary":true
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}card`,
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
      "link":`${docWebsite}chip`,
      "type":"Chip",
      "properties":{
        children:"hello"
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}date-picker`,
      "type":"DatePicker",
      "properties":{
        "title":"hello"
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}divider`,
      "type":"Divider",
      "properties":{
        "title":"hello"
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}list`,
      "type":"List",
      "properties":{
        "title":"hello",
        "children":iconData.map((x,index) => <ListItem primaryText={x} leftIcon={<FontIcon className="material-icons">{x}</FontIcon>} />)
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}icon-menu`,
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
      "link":`${docWebsite}dropdown-menu`,
      "type":"DropDownMenu",
      "properties":{
        value:1,
        children:listData.map((x,index) => <MenuItem value={index} primaryText={x} />)
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}circular-progress`,
      "type":"CircularProgress",
      "properties":{
        "title":"hello"
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}select-field`,
      "type":"SelectField",
      "properties":{
        floatingLabelText:"floatingLabelText",
        value:1,
        children:listData.map((x,index) => <MenuItem value={index} primaryText={x} />)
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}slider`,
      "type":"Slider",
      "properties":{
        "title":"hello"
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}checkbox`,
      "type":"Checkbox",
      "properties":{
        "title":"hello"
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}stepper`,
      "type":"Stepper",
      "properties":{
        activeStep:1,
        children:listData.map((x,index)=><Step><StepLabel>{x}</StepLabel></Step>)
      }
    },
    {
      "library":"Material",
      "link":`${docWebsite}table`,
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
    "link":`${docWebsite}tabs`,
    "type":"Tabs",
    "properties":{
      children:listData.map((x,index) => <Tab label={x} >
      </Tab>)
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}text-field`,
    "type":"TextField",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}time-picker`,
    "type":"TimePicker",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "link":`${docWebsite}toolbar`,
    "type":"Toolbar",
    "properties":{
    }
  },
  {
    "library":"Layout",
    "link":`${docWebsite}toolbar`,
    "type":"Row",
    "properties":{
    }
  },
  {
    "library":"Layout",
    "link":`${docWebsite}toolbar`,
    "type":"Column",
    "properties":{
    }
  }
];
