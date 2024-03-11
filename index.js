const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const port = '5000'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(port, () => {
    console.log(`listening on port:${port}`);
});