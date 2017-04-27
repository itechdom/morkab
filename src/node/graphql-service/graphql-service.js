const express = require('express');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
import schema from './graphql-service/schema';
import { graphql } from 'graphql';
var bodyParser  = require('body-parser');

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------

var apiRoutes = express.Router();

export default function auth({
    app
}) {
    // parse POST body as text
    app.use(bodyParser.text({
        type: 'application/graphql'
    }));

    apiRoutes.post('/graphql', (req, res) => {
        // execute GraphQL!
        graphql(schema, req.body)
            .then((result) => {
                res.send(JSON.stringify(result, null, 2));
            });
    });
    
    return apiRoutes;
}