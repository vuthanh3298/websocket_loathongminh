const WebSocket = require("ws");

const ws = new WebSocket("ws://192.168.1.3:3000/");

ws.on("open", function open() {
    ws.send("something");
});

ws.on("message", function incoming(data) {
    console.log(data);
});