import { Schema, model } from 'mongoose';
import { IDENTIFICATION_TYPE, MARITAL_STATUS, EMPLOYMENT_STATUS, GENDER, COUNTRIES, Models, EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/utils/constants';
import BaseSchema from './BaseSchema';

const options = { timestamps: true };

const TenantSchema = new Schema({
    name: {
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
    town: String,
    zip: String,
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
    ...BaseSchema
}, options);

export default model(Models.Tenant, TenantSchema);