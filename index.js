var http = require('http'),
    sockets = require('./socketconnection');

function handler (req, res) {
    res.writeHead(200);
    res.end("handled the server");
}

var server = http.createServer(handler);

// tells sockets to setup
sockets.setup(server);

sockets.onEvent(function (recevData, client) {
    console.log('Received data', recevData);
    // triggering event from outside
    if(recevData.type !== 'acknowledgement') {
        sockets.broadcast(client, recevData);
    }
});

var port = 8080;
server.listen(port, function () {
    console.log('listening at %s', port);
});
