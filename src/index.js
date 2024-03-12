const http = require('http');
const express = require('express');

const { Server } = require('socket.io');
const connectDB = require('./database');
const { bookModel } = require('./model');

const port = '5000';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/book', async (req, res) => {
    try {
        await connectDB();
        await bookModel.create(req.body);
    } catch (error) {
        return res.status(400).json({ message: `Error : ${error.message}` })
    }

    return res.status(200).json({ message: "Success: Create book chat room." })
});

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