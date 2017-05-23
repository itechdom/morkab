const express = require('express');
import {download} from './builder';
var apiRoutes = express.Router();
let {angularRenderer,generateIndexFile} = require('./renderers/ng');
let {reactRenderer} = require('./renderers/react');
import {install} from './utils/install.js';
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
    res.send('Hello! this is morkab backend!');
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

  apiRoutes.get('/react',function(req,res){
    let renderedComp;
    componentList.map((comp)=>{
      renderedComp = reactRenderer({componentList:comp.componentList,wrapper:comp.wrapper});
    })
    res.send({html:renderedComp[15]});
  });

  apiRoutes.post('/react/install',function(req,res){
    //npm install libs and extensions to the right renderer
    install("");
  });

  app.use('/ng', express.static(distFolder));

  return apiRoutes;
}
