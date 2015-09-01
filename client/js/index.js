(function () {
    var socket = io.connect('http://localhost:8080');

    var batteryStatusEle = document.querySelector('.battery-status');
    socket.on('notification', function (ev) {
        console.log('received push notification', ev);
        if(ev.type === 'battery-change') {
            // TODO: show desktop notification
            batteryStatusEle.querySelector('.battery-level').innerHTML =
                ev.data.level + "%";

            batteryStatusEle.querySelector('.battery-charging').innerHTML =
                ev.data.isPlugged ? "CHARGING" : "NOTCHARGING";
        }
    });

    function send_msg (msg) {
        socket.emit('notification', {
            type: 'chat',
            data: {
                message: msg
            }
        });
    }

    socket.on('connect', function () {
        console.log('sending out notification');
        socket.emit('notification', { type: 'acknowledgement', data: { message: 'start sending messages'}});
    });
})();
