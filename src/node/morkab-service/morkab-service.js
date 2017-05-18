const express = require('express');
import {download} from './builder';
var apiRoutes = express.Router();
import uiLibraries from './libraries';

export default function({
    app
}) {

    apiRoutes.get('/', function(req, res) {
        uiLibraries.map((lib)=>{
          download(lib.url,`./data/${lib.name}`);
        });
        res.send('Hello! this is morkab backend!');
    });

    return apiRoutes;
}
