process.stdin.on('readable', function () {
    var buf = process.stdin.read();
    console.log(String(buf).replace('\n',''));
});
