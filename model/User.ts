import { Schema, model } from 'mongoose';
import { IDENTIFICATION_TYPE, MARITAL_STATUS, EMPLOYMENT_STATUS, GENDER, COUNTRIES, Models, EMAIL_REGEX, PHONE_NUMBER_REGEX, Roles } from '@/utils';
import { IUser } from '@/utils';

const options = { timestamps: true };

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    identificationNumber: {
        type: String,
        unique: true
    },
    identificationType: {
        type: String,
        enum: IDENTIFICATION_TYPE
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(value: string) {
                return EMAIL_REGEX.test(value)
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value: string) {
                return PHONE_NUMBER_REGEX.test(value)
            }
        }
    },
    gender: {
        type: String,
        enum: GENDER
    },
    address: String,
    city: String,
    nationality: {
        type: String,
        enum: COUNTRIES
    },
    employmentStatus: {
        type: String,
        enum: EMPLOYMENT_STATUS
    },
    occupation: String,
    maritalStatus: {
        type: String,
        enum: MARITAL_STATUS
    },
    photo: String,
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [],
        required: true,
        validate: {
            validator: function(values: []) {
                let rolesList = Object.values(Roles);

                values.forEach(value => {
                    if (rolesList.indexOf(value) == -1) return false;
                })
                return true;
            }
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, options);

export default model<IUser>(Models.User, UserSchema);