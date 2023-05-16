import { Schema, model } from 'mongoose';
import BaseSchema from './BaseSchema';
import { Models } from '@/utils/constants';

const options = { timestamps: true };

const PropertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    estate: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    ...BaseSchema
}, options);

export default model(Models.Property, PropertySchema);