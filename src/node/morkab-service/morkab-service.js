const express = require('express');
import {download} from './builder';
var apiRoutes = express.Router();
let angularRenderer = require('./renderers/ng');
let webdriverio = require('webdriverio');
let fs = require('fs');

export default function({
  app,
  config
}) {

  let options = {
    desiredCapabilities: {
      browserName: 'firefox'
    }
  };

  let index = (tag) => (`
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
        <title>AngularApp</title>
        <base href="/">

        <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" type="image/x-icon" href="favicon.ico">
        </head>
        <body>
          <script type="text/javascript">
            window.tag = ${tag};
          </script>
          <my-app [tag]=${tag}>Loading AppComponent content here ...</my-app>
        </body>
      </html>
  `);

  apiRoutes.get('/', function(req, res) {
    download("https://github.com/callemall/material-ui","./data/material-ui");
    res.send('Hello! this is budgetqt backend!');
  });

  apiRoutes.get('/angular',function(req,res){
    let comp = req.body;
    //we are sending the component instance here
    let tag = "foo-bar";
    index(foo-bar);
    let url = `http://${config.ip}:${config.port}/angular/client?tag=${foo-bar}`
    let response = angularRenderer({webdriverio,options,});
    response.then((data)=>{
      res.send(data);
    })
  });

  apiRoutes.get('/angular/client',function(req,res){
    let tag = req.params.tag;
  });

  return apiRoutes;
}
