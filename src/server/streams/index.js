//Lets require/import the HTTP module
const http = require('http');
const fs = require('fs');

//Lets define a port we want to listen to
const PORT=8000;

//We need a function which handles requests and send response
function handleRequest(req, res){
    //request.pipe(response);
    let fileStream = fs.createReadStream('./src/node/streams/data.txt');
    fileStream.pipe(res)
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
