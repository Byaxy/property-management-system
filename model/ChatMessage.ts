import { Models } from '@/utils/constants';
import { Schema, model, Types } from 'mongoose';

const options = { timestamps: true };

const ChatMessageSchema = new Schema({
    senderId: {
        type: Types.ObjectId,
        ref: Models.User,
        required: true,
        validate: {
            validator: function(value: Types.ObjectId) {
                // Ensure senderId != receiverId
                return !value.equals(this.receiverId);
            }
        }
    },
    receiverId: {
        type: Types.ObjectId,
        ref: Models.User,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, options);

export default model(Models.ChatMessage, ChatMessageSchema);