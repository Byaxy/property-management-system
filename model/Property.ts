import { Schema, model } from 'mongoose';
import { IProperty, PropertyType, Models } from '@/utils';

const options = { timestamps: true };

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
}, options);

export default model<IProperty>(Models.Property, PropertySchema);