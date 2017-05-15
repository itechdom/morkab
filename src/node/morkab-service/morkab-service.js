// basic route (http://localhost:8080)
const express = require('express');
import {download} from './builder';
var apiRoutes = express.Router();

export default function({
    app
}) {

    apiRoutes.get('/', function(req, res) {
        download("https://github.com/callemall/material-ui","./data/material-ui");
        res.send('Hello! this is budgetqt backend!');
    });

    return apiRoutes;
}
