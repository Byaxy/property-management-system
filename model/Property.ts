import { Schema, model } from 'mongoose';
import { IProperty, PropertyType, Models, DEFAULT_MODEL_OPTIONS, addCommas, PROPERTY_TYPES } from '@/utils';

const PropertySchema = new Schema<IProperty>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    propertyType: {
        type: String,
        required: [true, "Property type is required"],
        enum: {
            values: PROPERTY_TYPES,
            message: `Must be either ${addCommas(PROPERTY_TYPES)}`
        }
    },
    numberOfUnits: {
        type: Number,
        required: [true, "Number of units is required"],
        min: [1, "Must be at least 1"]
    },
    photos: Array<String>,
    isActive: {
        type: Boolean,
        default: true
    }
}, DEFAULT_MODEL_OPTIONS);

export default model<IProperty>(Models.Property, PropertySchema);