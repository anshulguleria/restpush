function setup(server) {
    var io = require('socket.io').listen(server);


    // creating a new socket to accept and emit
    // change events
    io.on('connection', function (socket) {
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

    return {
        emit: function (ev) {
            return io.emit('notification', ev);
        }
    };
}

module.exports = {
    setup: setup
};
