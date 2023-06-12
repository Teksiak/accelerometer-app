const express = require("express");
const path = require("path");
const WebSocket = require("ws");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log("WebSocket starting... PORT: " + PORT);
});

wss.on("connection", (ws, req) => {
    const clientip = req.connection.remoteAddress;
    ws.on("message", (message) => {
        console.log(JSON.parse(message.toString()));
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
        // ws.send("Working");
    });
});
