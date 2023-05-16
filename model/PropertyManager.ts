import { Models } from "@/utils/constants";
import { Schema, Types, model } from "mongoose";
import BaseSchema from "./BaseSchema";

const options = { timestamps: true };

const PropertyManagerSchema = new Schema({
    propertyId: {
        type: Types.ObjectId,
        ref: Models.Property,
        required: true,
        validate: {
            validator: function(value: Types.ObjectId) {
                // Ensure senderId != receiverId
                return !value.equals(this.managerId);
            }
        }
    },
    managerId: {
        type: Types.ObjectId,
        ref: Models.User,
        required: true
    },
    ...BaseSchema
}, options);

export default model(Models.PropertyManager, PropertyManagerSchema);