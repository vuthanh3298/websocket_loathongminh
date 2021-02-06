const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const path = require("path");

const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
    console.log("A new client Connected!");
});

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("client.html");
});

app.get("/loa", (req, res) => {
    console.log(req.query.data);
    wss.clients.forEach(function each(client) {
        client.send(req.query.data);
    });
    res.end();
});

server.listen(3000, () => console.log(`Lisening on port: 3000`));