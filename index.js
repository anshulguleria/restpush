var restify = require('restify'),
    sockets = require('./socketconnection'),
    helloRoutes = require('./routes/hello');


var server = restify.createServer();

// tells sockets to setup
sockets.setup(server.server);

sockets.on(function (ev) {
    console.log('received data on outside', ev);

    // triggering event from outside
    if(ev.data.type !== 'acknowledgement') {
        sockets.broadcast({
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
