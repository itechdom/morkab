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
    "title":"Column",
    "properties":{
      "children":[],
      "direction":"column"
    },
    "subChildren":[]
  },
  {
    "element":Layout.Row,
    "title":"Row",
    "properties":{
      "children":[],
      "direction":"row"
    },
    "subChildren":[]
  },
  {
    "element":Animation,
    "title":"Animation",
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
    },
    "subChildren":[]
  },
];
