import { Schema, model } from 'mongoose';
import { EMAIL_REGEX, Models, ROLES } from '@/utils/constants';
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
    roles: {
        type: [],
        required: true,
        validate: {
            validator: function(values: []) {
                // Maximum assignable roles are CODE_MANAGER and ADMIN
                if (values.length > 2) return false;

                values.forEach(value => {
                    if (ROLES.indexOf(value) == -1) return false;
                })
                return true;
            }
        }
    },
    ...BaseSchema
}, options);

export default model(Models.User, UserSchema);