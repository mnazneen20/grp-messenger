import express from 'express';
import { createServer } from 'node:http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io'
import userRouter from './services/user/user.js';
import chatroomRouter from './services/chatrooms/chats.js';
import jwt from 'jsonwebtoken'
import User from './services/user/userSchema.js';
import Message from './services/messages/msgSchema.js'

dotenv.config();
const PORT = 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://grp-messenger-client.vercel.app",
        credentials: true,
    }
})

app.use(cors({
    origin: "https://grp-messenger-client.vercel.app",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.status(200).json({ msg: "hello world, this is grp-messenger server" })
})
// application user routes:
app.use('/api', userRouter);
// chat room routes:
app.use('/api', chatroomRouter);

//connecting io event 
io.on('connection', (socket) => {
    console.log('a user is connected', socket.id);
    // console.log(socket)
    // validateSocketUser(socket.handshake.headers?.cookie);
    socket.on('joinroom', (romid) => {
        socket.join(romid)
        console.log(`${socket.id} user joined room ${romid}`)
    })
    socket.on('send_messege', async (data) => {
        // console.log(data)
        const newmsg = await Message.create(data);
        const msg = await Message.findById(newmsg).populate('sender');

        // console.log(msg)
        socket.to(data.room).emit('receive_msg', msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

try {
    mongoose.connect(process.env.MONGO_CRED).then(() => {
        console.log('db connected');
        server.listen(PORT, () => {
            console.log('server started at port:', PORT);
        })
    })
} catch (error) {
    console.log('db connection error', error);
}