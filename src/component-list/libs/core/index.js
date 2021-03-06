import React from 'react';
import {Animation} from './Animation';
import * as Layout from './Layout';
import {External} from './External';

const listData = [
  "item 1",
  "item 2",
  "item 3"
];

const iconData = [
  "restore",
  "favorite"
]

export const wrapper = ({children})=>{return<div></div>};

export const componentList = [
  {
    "element":Layout.Row,
    "tag":"Column",
    "properties":{
      "children":[],
      "direction":"column"
    }
  },
  {
    "element":Layout.Row,
    "tag":"Row",
    "properties":{
      "children":[],
      "direction":"row"
    }
  },
  {
    "element":Animation,
    "tag":"Animation",
    "properties":{
      children:[],
      enter:"fadeIn",
      enterActive:"fadeIn",
      leave:"fadeOut",
      leaveActive:"fadeOut",
      appear:"bounce",
      appearActive:"bounce",
      transitionEnterTimeout:500,
      transitionLeaveTimeout:500
    }
  },
];
