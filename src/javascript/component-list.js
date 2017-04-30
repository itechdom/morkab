import React from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

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
    "type":"Menu",
    "properties":{
      "title":"hello"
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
    "type":"Popover",
    "properties":{
      "title":"hello"
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
      "title":"hello"
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
    "type":"Slider",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Snackbar",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Stepper",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Subheader",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Table",
    "properties":{
      "title":"hello"
    }
  },
  {
    "library":"Material",
    "type":"Tabs",
    "properties":{
      "title":"hello"
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
