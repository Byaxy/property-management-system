import { Schema, model } from 'mongoose';
import { EMAIL_REGEX, Models } from '@/utils/constants';
import BaseSchema from './BaseSchema';

const options = { timestamps: true };

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value: string) {
                return EMAIL_REGEX.test(value)
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [],
        required: true,
        /*TODO: Add validation*/
    },
    ...BaseSchema
}, options);

export default model(Models.User, UserSchema);