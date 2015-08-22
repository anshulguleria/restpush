(function () {
    var socket = io.connect('http://localhost:8080');

    socket.on('notification', function (ev) {
        console.log('received push notification', ev);
        var lastmsgElement = document.querySelector('#last_message');
        lastmsgElement.innerHTML = ev.data.message;
    });

    function send_msg (msg) {
        socket.emit('notification', {
            type: 'chat',
            data: {
                message: msg
            }
        });
    }

    var send_btn = document.querySelector('#send_msg_btn');
    send_btn.addEventListener('click', function (ev) {
        var message = document.querySelector('#inp_msg').value;
        if(!message) {
            return;
        }
        send_msg(message);
    });

    socket.on('connect', function () {
        console.log('sending out notification');
        socket.emit('notification', { type: 'test', data: { message: 'start sending messages'}});
    });
})();
