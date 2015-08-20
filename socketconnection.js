function setup(server) {
    var io = require('socket.io').listen(server);


    // creating a new socket to accept and emit
    // change events
    io.on('connection', function (socket) {
        socket.emit('notification', {
            type: "fromserver", data: {
                test: 'wassup'
            }
        });

        // binding to custom event works only
        // after connection event or after
        // successful connection
        socket.on('notification', function (data) {
            console.log('received event', data);
        });
        console.log('socket connection setup');
        socket.on('disconnect', function () {
            console.log('socket disconnected');
        });


        // trigger event to check
        setTimeout(function () {
            socket.volatile.emit('notification', {
                type: 'test',
                data: { text: 'some test data'}
            });
        }, 5000);
    });
    return io;
}

module.exports = {
    setup: setup
};
