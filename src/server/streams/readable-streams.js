var Readable = require('stream').Readable;

var rs = new Readable;
rs.push('beep ');
rs.push('boop\n');
rs.push(null);

//push to the stream only when data is needed
var c = 97;
// it will just keep pushing data till we hit the code, it's automatically looping
rs._read = function () {
        rs.push(String.fromCharCode(c++));
            if (c > 'z'.charCodeAt(0)) rs.push(null);
};

rs.pipe(process.stdout);
