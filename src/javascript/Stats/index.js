"use strict"

var React = require('react');
var ReactDOM = require('react-dom');
window.WebGLDebugUtils = {};
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

export default class Stats extends React.Component{
  // load your general data
  constructor(props){
    super(props);
  }

  render(){
    return <XYPlot
      width={300}
      height={300}>
      <HorizontalGridLines />
      <LineSeries
        data={[
          {x: 1, y: 10},
          {x: 2, y: 5},
          {x: 3, y: 15}
        ]}/>
        <XAxis />
        <YAxis />
      </XYPlot>
    }
  }
