import { Schema, model } from 'mongoose';
import { IProperty, PropertyType, Models, DEFAULT_MODEL_OPTIONS } from '@/utils';

const PropertySchema = new Schema<IProperty>({
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
        enum: PropertyType
    },
    numberOfUnits: {
        type: Number,
        required: true
    },
    photos: Array<String>,
    isActive: {
        type: Boolean,
        default: true
    }
}, DEFAULT_MODEL_OPTIONS);

export default model<IProperty>(Models.Property, PropertySchema);