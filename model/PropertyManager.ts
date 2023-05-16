import { Models } from "@/utils/constants";
import { Schema, Types, model } from "mongoose";
import BaseSchema from "./BaseSchema";

const options = { timestamps: true };

const PropertyManagerSchema = new Schema({
    property: {
        type: Types.ObjectId,
        ref: Models.Property,
        required: true
    },
    manager: {
        type: Types.ObjectId,
        ref: Models.Manager,
        required: true
    },
    ...BaseSchema
}, options);

export default model(Models.PropertyManager, PropertyManagerSchema);