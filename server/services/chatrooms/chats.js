import Chatroom from "./chatSchema.js";
import Message from '../messages/msgSchema.js'
import express from 'express';
import { populate } from "dotenv";
const chatroomRouter = express.Router();

// create a new chat room
chatroomRouter.post('/newroom', async (req, res) => {
    const { roomname, roomdesc } = req.body;
    // console.log(roomdesc, roomname)
    try {
        const room = await Chatroom.create({ roomname, roomdesc });
        // console.log(room);
        return res.status(201).json({ msg: "new room created." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong" });
    }
});

// get all the rooms
chatroomRouter.get('/rooms', async (req, res) => {
    try {
        const rooms = await Chatroom.find();
        return res.status(200).json({ msg: "list of all the rooms", rooms: rooms })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong" });
    }
});

// get all messages of a room
chatroomRouter.get('/messages/:roomid', async (req, res) => {
    const { roomid } = req.params;
    try {
        const allmessages = await Message.find({ room: roomid }).populate('sender');
        // console.log(allmessages);
        res.status(200).json({ msg: "all the messages from the room", allmsgs: allmessages })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "something went wrong" });
    }
})

export default chatroomRouter;