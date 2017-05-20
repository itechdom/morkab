import React from 'react';
import * as Grommet from 'grommet';
//there are other themes here ...
require('grommet/grommet.min.css');

const docWebsite = "https://grommet.github.io/docs/";

const listData = [
  "item 1",
  "item 2",
  "item 3"
];

const iconData = [
  "restore",
  "favorite"
]

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export const wrapper = ({children})=>{return<div></div>};

export const componentList = Object.keys(Grommet).map((key)=>{
  return {
    "element":Grommet[key],
    "title":key,
    "properties":{
    }
  }
}).filter((comp)=>{
  return isFunction(comp.element) && comp.title.indexOf('Icon') === -1 && comp.title !== "default" && comp.title !== 'Carousel';
});
