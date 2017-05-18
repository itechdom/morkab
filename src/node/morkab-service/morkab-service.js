const express = require('express');
import {download} from './builder';
var apiRoutes = express.Router();
import uiLibraries from './libraries';
let {angularRenderer,generateIndexFile} = require('./renderers/ng');
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

  apiRoutes.get('/', function(req, res) {
    uiLibraries.map((lib)=>{
      download(lib.url,`./data/${lib.name}`);
    });
    res.send('Hello! this is morkab backend!');
  });



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
