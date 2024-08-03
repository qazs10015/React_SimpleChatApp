const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const socket = require('socket.io');


const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// module.exports.register = (req, res) => {
//     debugger;
//     console.info(req.body); 
//     res.send('Registration endpoint hit');
// };
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.get('/api/test', (req, res) => {
    res.send('Hello World!');
});




mongoose.connect(process.env.MONGO_URL).then(() => {
    console.info('DB connected');
}).catch(err => {
    console.error(err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})


const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',

    }
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("addUser", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("sendMsg", (data) => {
        console.log('sendMsg', data);
        const sendUserSocket = onlineUsers.get(data.to);
        console.log('to', sendUserSocket);
        if (sendUserSocket) {
            io.to(sendUserSocket).emit("receiveMsg", data);
        }
    });
});
