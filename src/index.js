const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const port = '5000'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.post('/book', (req, res) => {
    return res.status(200).json("post")
})

app.get('/book/:id', (req, res) => {
    return res.status(200).json("get")
})

app.get('/booklist', (req, res) => {
    return res.status(200).json("get list")
})

app.delete('/book/:id', (req, res) => {
    return res.status(200).json("delete")
})

server.listen(port, () => {
    console.log(`listening on port:${port}`);
});