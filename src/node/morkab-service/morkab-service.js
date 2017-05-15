// basic route (http://localhost:8080)
const express = require('express');

var apiRoutes = express.Router();

export default function({
    app
}) {

    apiRoutes.get('/', function(req, res) {
        res.send('Hello! this is budgetqt backend!');
    });

    return apiRoutes;
}
