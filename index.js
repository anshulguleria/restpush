var restify = require('restify'),
    sockets = require('./socketconnection'),
    helloRoutes = require('./routes/hello');


var server = restify.createServer();

// tells sockets to setup
sockets.setup(server.server);

sockets.onEvent(function (ev, client) {
    // triggering event from outside
    if(ev.data.type !== 'acknowledgement') {
        sockets.broadcast(client, {
            type: 'test',
            data: { message: ev.data.message }
        });
    }
});



// register routes
helloRoutes.register('/hello', server, sockets);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
