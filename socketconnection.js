// TODO: not acting as singleton
var socketio = require('socket.io'),
    clientsCount  = 0,
    broadcastEvent = null,
    registeredListeners = [];

/**
 * listenEvent
 * Registers "notification" event to socket client
 * @param {socketClient} client Client instance received on "connection" event
 * @param {Function} callback Callback function to register
 */
var listenEvent = function (client, callback) {
    client.on('notification', function (data) {
        // pass data and client socket instance
        callback(data, client);
    });
};

/**
 * emitEvent
 * Emits "notification" event with the data provided, using the client instance.
 * @param {socketClient} client Client instance received on "connection" event
 * @param {Object} data Object to send on event
 */
var emitEvent = function (client, data) {
    client.emit('notification', data);
};

/**
 * setup
 * Sets up socket connection using the server
 * instance provided
 * @param server
 * @return {io} Returns io instance of server created
 */
function setup(server) {
    var io = socketio.listen(server);

    broadcastEvent = function (client, data) {
        if(client) {
            // broadcast all except the client which triggered server event
            client.broadcast.emit('notification', data);
        } else {
            // broadcast all including the client which might have
            // triggered the event to server.
            io.emit('notification', data);
        }
    };

    // creating a new socket to accept and emit
    // change events
    io.on('connection', function (socket) {
        console.log('%s connected', socket.id);
        clientsCount++;

        socket.on('disconnect', function () {
            console.log(arguments, 'socket disconnected');
            clientsCount--;
        });

        // bind queued listen calls
        registeredListeners.forEach(function(callback) {
            listenEvent(socket, callback);
        });
    });
    return io;
}

module.exports = {
    setup: setup,
    emit: function (client, data) {
        console.log('running "emit" hook', clientsCount);
        if(clientsCount === 0) {
            console.log('no clients connected');
        } else {
            emitEvent(client, data);
        }
    },
    broadcast: function (client, data) {
        console.log('running "broadcast" hook', clientsCount);
        if(clientsCount === 0) {
            console.log('no clients connected');
        } else {
            broadcastEvent(client, data);
        }
    },
    onEvent: function (fn) {
        console.log('registering for "on" hook');
        // we push only to array and on each "connection" event
        // this array is read and registered on "notification" event
        registeredListeners.push(fn);
    }
};
