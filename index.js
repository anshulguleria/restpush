var restify = require('restify'),
    sockets = require('./socketconnection'),
    helloRoutes = require('./routes/hello');


var server = restify.createServer();

// tells sockets to setup
var io = sockets.setup(server.server);

// listen to notification event from clients
io.on('notification', function (data) {
    console.log('got message from client');
    // pass on the message to connected clients
    io.emit('notification', data);
});

// register routes
helloRoutes.register('/hello', server, io);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
