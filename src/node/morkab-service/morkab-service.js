const express = require('express');
import {download} from './builder';
var apiRoutes = express.Router();
let angularRenderer = require('./renderers/ng');
let webdriverio = require('webdriverio');
let fs = require('fs');
var path = require('path');
const distFolder = path.join(__dirname, 'renderers/ng/client/dist/');

export default function({
  app,
  config
}) {

  let options = {
    desiredCapabilities: {
      browserName: 'firefox'
    }
  };

  let generateIndexFile = (tag,distFolder) => (`
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
            <my-app id="app" tag=${tag}>Loading AppComponent content here ...</my-app>
            <script type="text/javascript" src="ng/inline.bundle.js"></script><script type="text/javascript" src="ng/polyfills.bundle.js"></script><script type="text/javascript" src="ng/styles.bundle.js"></script><script type="text/javascript" src="ng/vendor.bundle.js"></script><script type="text/javascript" src="ng/main.bundle.js"></script></body>
          </html>
          `);

          apiRoutes.get('/', function(req, res) {
            //download("https://github.com/callemall/material-ui","./data/material-ui");
            res.send('Hello! this is budgetqt backend!');
          });

          apiRoutes.get('/angular',function(req,res){
            let comp = req.body;
            let tag = "foo-bar";
            let url = `http://${config.get('server.ip')}:${config.get('server.port')}/ng`;
            let indexFile = generateIndexFile(tag,distFolder);
            fs.writeFile(`${distFolder}/index.html`, indexFile, (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
              let response = angularRenderer({webdriverio,options,url,tag});
              response.then((data)=>{
                console.log("RESPONSE:",data);
                res.send({html:data});
              })
            });
          });

          app.use('/ng', express.static(distFolder));

          return apiRoutes;
        }
