import { Schema, model } from 'mongoose';
import BaseSchema from './BaseSchema';
import { Models, PROPERTY_TYPE } from '@/utils/constants';

const options = { timestamps: true };

const PropertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true,
        enum: PROPERTY_TYPE
    },
    numberOfUnits: {
        type: Number,
        required: true
    },
    photos: {
        type: Array<String>
    },
    ...BaseSchema
}, options);

export default model(Models.Property, PropertySchema);