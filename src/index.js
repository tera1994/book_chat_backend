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

app.post('/book-chat-room', async (req, res) => {
    try {
        await connectDB();
        await bookModel.create(req.body);
    } catch (error) {
        console.log(`ERROR : ${error.message}`)
        return res.status(400).json({ message: "FAILURE : Create a book chat room." })
    }

    return res.status(200).json({ message: "SUCCESS: Create a book chat room." })
});

app.get('/book-chat-room/:id', async (req, res) => {
    let book;
    try {
        await connectDB()
        book = await bookModel.findById(req.params.id)
    } catch (error) {
        console.log(`ERROR : ${error.message}`)
        return res.status(400).json({ message: "FAILURE : Get the book chat room." })
    }
    return res.status(200).json({ message: "SUCCESS: Get the book chat room.", bookChatRoom: book })
})

app.get('/book-chat-room-list', async (req, res) => {
    let bookList;
    try {
        await connectDB()
        bookList = await bookModel.find()
    } catch (error) {
        console.log(`ERROR : ${error.message}`)
        return res.status(400).json({ message: "FAILURE : Get book chat room list." })
    }
    return res.status(200).json({ message: "SUCCESS: Get book chat room list.", bookChatRoomList: bookList })
})

app.delete('/book-chat-room/:id', async (req, res) => {
    try {
        await connectDB()
        await bookModel.deleteOne({ _id: req.params.id })
    } catch (error) {
        console.log(`ERROR : ${error.message}`)
        return res.status(400).json({ message: "FAILURE : Delete the book chat room." })
    }
    return res.status(200).json({ message: "SUCCESS: Delete the book chat room." })
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    let room = '';
    let name = '';

    io.to(socket.id).emit('connectid', { socketId: socket.id })

    socket.on('login', (msg) => {
        room = msg.room;
        socket.join(room);
        name = msg.name;
        io.to(room).emit('login', { message: `${name}さんが入室しました。` });
    })
    socket.on('message', (msg) => {
        io.to(room).emit('message', msg);
    });

    socket.on('disconnect', () => {
        io.to(room).emit('disconnect', { message: `${name}さんが退出しました。` })
    })
});

server.listen(port, () => {
    console.log(`listening on port:${port}`);
});