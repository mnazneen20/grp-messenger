import { model, Schema } from 'mongoose';

const ChatRooms = new Schema({
    roomname: {
        type: String,
        required: true,
        unique: true,
    },
    roomdesc: {
        type: String,
        required: true,
    },
});

export default model('Chatrooms', ChatRooms);