var http = require('http'),
    sockets = require('./socketconnection'),
    helloRoutes = require('./routes/hello');

function handler (req, res) {
    res.writeHead(200);
    res.end("handled the server");
}

var server = http.createServer(handler);

// tells sockets to setup
sockets.setup(server);

sockets.onEvent(function (ev, client) {
    // triggering event from outside
    if(ev.data.type !== 'acknowledgement') {
        sockets.broadcast(client, {
            type: 'test',
            data: { message: ev.data.message }
        });
    }
});

var port = 8080;
server.listen(port, function () {
    console.log('listening at %s', port);
});
