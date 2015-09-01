A simple socket server
====
This is a simple socket server which listens to `notification` event and triggers the `notification` event.

##Local setup
Currently it has dependency on "restify" server but will be removed later on.

Install dependencies:
```javascript
npm install
```

Run server:
```js
node index.js
```
This will run server on `localhost:8080`

Code on client side i.e. browser:
```js
var socket = io.connect('http://localhost:8080');
// use this socket to send event to server
socket.on('notification', function (data) {
    // receives event from server
});

// emits event to server
socket.emit('notification', {
    type: 'from-client',
    data: {
        message: 'test'
    }
});
```

##Object format for communication
Since we are using only one event `notification` here thus we have kept the object fomat as:
```js
{
    type: "",   // type of event. Generally some name depicting the purpose of event
    data: {}    // data to send to server or other sockets
}
```

##TODO
* Add documentation
* <s>Upload it to github</s>
* <s>Add ignore file</s>
* Remove restify dependency. If it has to be as simple socket server then there is not need for any other dependency for apis.

##Issues
* <s>Need to connect the on callback to the socket on which it was binded so that the emit can be triggered on the same socket.</s>
