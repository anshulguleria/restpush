(function () {
    var showNotification = function (msg) {
        if(Notification.permission === 'denied') {
            console.log(msg);
        } else {
            if(Notification.permission !== 'granted') {
                Notification.requestPermission(function (permission) {
                    if(permission === 'granted') {
                        var notification = new Notification(msg);
                    } else {
                        console.log(msg);
                    }
                });
            } else {
                var notification = new Notification(msg);
            }
        }
    };


    // ask permission before hand
    if(!("Notification" in window)) {
        // reset showNotification method
        showNotification = function (msg) {
            console.log(msg);
        };
        console.log("Notification api not supported in this browser");
    } else {
        if(Notification.permission !== 'denied' &&
           Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }

    // export notification method
    window.showNotification = showNotification;
})();
