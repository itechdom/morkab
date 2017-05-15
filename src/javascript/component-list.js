import React from 'react';
import * as Material from 'material-ui';
import * as Layout from './Library/Layout.js';

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
    "element":Layout.Row,
    "title":"Row",
    "link":`${docWebsite}toolbar`,
    "properties":{
      children:[],
      direction:'row',
      level:0
    },
    subChildren:[]
  },
  {
    "element":Layout.Row,
    "title":"Column",
    "link":`${docWebsite}toolbar`,
    "properties":{
      children:[],
      direction:'column',
      level:0
    },
    subChildren:[]
  },
  {
    "element":Material.AppBar,
    "link":`${docWebsite}app-bar`,
    "properties":{
      "title":"hello",
      iconElementRight:<Material.FlatButton label="Save" />
    }
  },
  {
    "element":Material.AutoComplete,
    "link":`${docWebsite}auto-complete`,
    "properties":{
      "dataSource":["Anas","Becky","Chaim David","David","Evalyn","Fouad"]
    }
  },
  {
    "element":Material.Avatar,
    "link":`${docWebsite}avatar`,
    "properties":{
      icon:<Material.FontIcon className="material-icons">folder</Material.FontIcon>
    }
  },
  {
    "element":Material.Badge,
    "link":`${docWebsite}badge`,
    "properties":{
      "badgeContent":1,
      primary:true,
      children:[]
    }
  },
  {
    "element":Material.BottomNavigation,
    "link":`${docWebsite}bottom-navigation`,
    "properties":{
      selectedIndex:0,
      children:iconData.map((x,index) => <Material.BottomNavigationItem style={{marginTop:0}} label={x} icon={<Material.FontIcon className="material-icons">{x}</Material.FontIcon>}></Material.BottomNavigationItem>)
    }
  },
  {
    "element":Material.FlatButton,
    "link":`${docWebsite}flat-button`,
    "properties":{
      "label":"hello"
    }
  },
  {
    "element":Material.RaisedButton,
    "link":`${docWebsite}flat-button`,
    "properties":{
      "label":"primary",
      "primary":true
    }
  },
  {
    "element":Material.RaisedButton,
    "link":`${docWebsite}flat-button`,
    "properties":{
      "label":"secondary",
      "secondary":true
    }
  },
  {
    "link":`${docWebsite}card`,
    "element":Material.Card,
    "properties":{
      children:[(<Material.CardHeader
        title="URL Avatar"
        subtitle="Subtitle"
        avatar="images/jsa-128.jpg"
      />),
      (<Material.CardMedia
        overlay={<Material.CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="images/nature-600-337.jpg" />
        </Material.CardMedia>),
        (<Material.CardTitle title="Card title" subtitle="Card subtitle" />),
        (<Material.CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </Material.CardText>),
        (<Material.CardActions>
          <Material.FlatButton label="Action1" />
          <Material.FlatButton label="Action2" />
        </Material.CardActions>)]
      }
    },
    {
      "element":Material.Chip,
      "link":`${docWebsite}chip`,
      "properties":{
        children:"hello"
      }
    },
    {
      "element":Material.DatePicker,
      "link":`${docWebsite}date-picker`,
      "properties":{
        "title":"hello"
      }
    },
    {
      "element":Material.Divider,
      "link":`${docWebsite}divider`
    },
    {
      "element":Material.List,
      "link":`${docWebsite}list`,
      "properties":{
        "title":"hello",
        "children":iconData.map((x,index) => <Material.ListItem
          primaryText={x}
          leftIcon={<Material.FontIcon className="material-icons">{x} </Material.FontIcon>}
        />
        )
      }
    },
    {
      "element":Material.IconMenu,
      "link":`${docWebsite}icon-menu`,
      "properties":{
        iconButtonElement:<Material.FontIcon className="material-icons">add</Material.FontIcon>,
        anchorOrigin:{horizontal: 'left', vertical: 'top'},
        targetOrigin:{horizontal: 'left', vertical: 'top'},
        children:listData.map((x,index) => <Material.MenuItem primaryText={x} />)
      }
    },
    {
      "element":Material.DropDownMenu,
      "link":`${docWebsite}dropdown-menu`,
      "properties":{
        value:1,
        children:listData.map((x,index) => <Material.MenuItem value={index} primaryText={x} />)
      }
    },
    {
      "element":Material.CircularProgress,
      "link":`${docWebsite}circular-progress`,
      "properties":{
        "title":"hello"
      }
    },
    {
      "element":Material.SelectField,
      "link":`${docWebsite}select-field`,
      "properties":{
        floatingLabelText:"floatingLabelText",
        value:1,
        children:listData.map((x,index) => <Material.MenuItem value={index} primaryText={x} />)
      }
    },
    {
      "element":Material.Slider,
      "link":`${docWebsite}slider`,
      "properties":{
        "title":"hello"
      }
    },
    {
      "element":Material.Checkbox,
      "link":`${docWebsite}checkbox`,
      "properties":{
        "title":"hello"
      }
    },
    {
      "element":Material.Stepper,
      "link":`${docWebsite}stepper`,
      "properties":{
        activeStep:1,
        children:listData.map((x,index)=><Material.Step><Material.StepLabel>{x}</Material.StepLabel></Material.Step>)
      }
    },
    {
      "element":Material.Table,
      "link":`${docWebsite}table`,
      "library":"Material",
      "elementString":"Table",
      "properties":{
        children:[
          (<Material.TableHeader>
            <Material.TableRow>
              <Material.TableHeaderColumn>ID</Material.TableHeaderColumn>
              <Material.TableHeaderColumn>Name</Material.TableHeaderColumn>
              <Material.TableHeaderColumn>Status</Material.TableHeaderColumn>
            </Material.TableRow>
          </Material.TableHeader>
        ),
        (
          <Material.TableBody>
            <Material.TableRow>
              <Material.TableRowColumn>1</Material.TableRowColumn>
              <Material.TableRowColumn>John Smith</Material.TableRowColumn>
              <Material.TableRowColumn>Employed</Material.TableRowColumn>
            </Material.TableRow>
            <Material.TableRow>
              <Material.TableRowColumn>2</Material.TableRowColumn>
              <Material.TableRowColumn>Randal White</Material.TableRowColumn>
              <Material.TableRowColumn>Unemployed</Material.TableRowColumn>
            </Material.TableRow>
            <Material.TableRow>
              <Material.TableRowColumn>3</Material.TableRowColumn>
              <Material.TableRowColumn>Stephanie Sanders</Material.TableRowColumn>
              <Material.TableRowColumn>Employed</Material.TableRowColumn>
            </Material.TableRow>
            <Material.TableRow>
              <Material.TableRowColumn>4</Material.TableRowColumn>
              <Material.TableRowColumn>Steve Brown</Material.TableRowColumn>
              <Material.TableRowColumn>Employed</Material.TableRowColumn>
            </Material.TableRow>
          </Material.TableBody>
        )
      ]
    }
  },
  {
    "element":Material.Tabs,
    "link":`${docWebsite}tabs`,
    "properties":{
      children:listData.map((x,index) => <Material.Tab label={x} >
      </Material.Tab>)
    }
  },
  {
    "element":Material.TextField,
    "link":`${docWebsite}text-field`,
    "properties":{
      "title":"hello"
    }
  },
  {
    "element":Material.TimePicker,
    "link":`${docWebsite}time-picker`,
    "properties":{
      "title":"hello"
    }
  },
  {
    "element":Material.Toolbar,
    "link":`${docWebsite}toolbar`,
    "properties":{
    }
  }
];
