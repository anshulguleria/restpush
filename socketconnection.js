// TODO: not acting as singleton
var socketio = require('socket.io'),
    clientsCount  = 0,
    emitEvent = null,
    broadcastEvent = null,
    listenEvent = null,
    pendingListenCallbacks = [];
function setup(server) {
    var io = socketio.listen(server);

    function emitGlobalEvent () {
        io.emit('notification', {type: 'global', data: {test: 'wassup'}});
    }
    // creating a new socket to accept and emit
    // change events
    io.on('connection', function (socket) {
        emitGlobalEvent();
        console.log('%s connected', socket.id);
        clientsCount++;

        socket.on('disconnect', function () {
            console.log(arguments, 'socket disconnected');
            clientsCount--;
        });

        emitEvent = function (data) {
            socket.emit('notification', data);
        };

        broadcastEvent = function (data) {
            socket.broadcast.emit('notification', data);
        };

        // binding to custom event works only
        // after connection event or after
        // successful connection
        listenEvent = function (fn) {
            console.log('connecting event');
            socket.on('notification', fn);
        };

        // bind queued listen calls
        pendingListenCallbacks.forEach(function(callback) {
            listenEvent(callback);
        });
    });
    return io;
}

module.exports = {
    setup: setup,
    emit: function (data) {
        console.log('running "emit" hook', clientsCount);
        if(clientsCount === 0) {
            console.log('no clients connected');
        } else {
            emitEvent(data);
        }
    },
    broadcast: function (data) {
        console.log('running "emit" hook', clientsCount);
        if(clientsCount === 0) {
            console.log('no clients connected');
        } else {
            broadcastEvent(data);
        }
    },
    on: function (fn) {
        console.log('running "on" hook', clientsCount);
        if(clientsCount === 0) {
            pendingListenCallbacks.push(fn);
        } else {
            listenEvent(fn);
        }
    }
};
