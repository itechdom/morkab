// basic route (http://localhost:8080)
const express = require('express');
import {download} from './builder';
var apiRoutes = express.Router();
let angularRenderer = require('./renderers/ng');
let webdriverio = require('webdriverio');

export default function({
  app
}) {

  let options = {
    desiredCapabilities: {
      browserName: 'firefox'
    }
  };

  apiRoutes.get('/', function(req, res) {
    download("https://github.com/callemall/material-ui","./data/material-ui");
    res.send('Hello! this is budgetqt backend!');
  });

  apiRoutes.get('/angular',function(req,res){
    let comp = req.body;
    //we are sending the component instance here
    let response = angularRenderer({webdriverio,options});
    response.then((data)=>{
      console.log(data);
      res.send(data);
    })
  });

  return apiRoutes;
}
