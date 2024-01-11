import { model, Schema } from 'mongoose';

const Messeges = new Schema({
    message: {
        type: String,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Chatrooms'
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    time: {
        type: String,
    }
}, { timestamps: true });

export default model('Messeges', Messeges);