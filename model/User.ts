import { Schema, model } from 'mongoose';
import { 
    IDENTIFICATION_TYPE, 
    MARITAL_STATUS, 
    EMPLOYMENT_STATUS, 
    GENDER, 
    COUNTRIES, 
    Models, 
    EMAIL_REGEX, 
    PHONE_NUMBER_REGEX, 
    Roles, 
    IUser, 
    DEFAULT_MODEL_OPTIONS ,
    addCommas
} from '@/utils';

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    identificationNumber: {
        type: String,
        unique: true
    },
    identificationType: {
        type: String,
        enum: {
            values: IDENTIFICATION_TYPE,
            message: `Must be either ${addCommas(IDENTIFICATION_TYPE)}`
        }
    },
    email: {
        type: String,
        validate: {
            validator: function(value: string) {
                return EMAIL_REGEX.test(value)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        validate: {
            validator: function(value: string) {
                return PHONE_NUMBER_REGEX.test(value)
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    gender: {
        type: String,
        enum: {
            values: GENDER,
            message: `Must be either ${addCommas(GENDER)}`
        }
    },
    address: String,
    city: String,
    nationality: {
        type: String,
        enum: {
            values: COUNTRIES,
            message: `Please pick a country from the provided list`
        }
    },
    employmentStatus: {
        type: String,
        enum: {
            values: EMPLOYMENT_STATUS,
            message: `Must be either ${addCommas(EMPLOYMENT_STATUS)}`
        }
    },
    occupation: String,
    maritalStatus: {
        type: String,
        enum: {
            values: MARITAL_STATUS,
            message: `Must be either ${addCommas(MARITAL_STATUS)}`
        }
    },
    photo: String,
    password: String,
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
}, DEFAULT_MODEL_OPTIONS);

export default model<IUser>(Models.User, UserSchema);