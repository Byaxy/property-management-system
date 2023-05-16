import { Schema, model, Types } from "mongoose";
import { Models, RENTAL_UNIT_TYPE } from "@/utils/constants";
import BaseSchema from "./BaseSchema";

const options = { timestamps: true };

const RentalUnitSchema = new Schema({
    unitNumber: {
        type: String,
        required: true
    },
    unitType: {
        type: String,
        required: true,
        enum: RENTAL_UNIT_TYPE
    },
    rent: {
        type: Number,
        min: 0,
        max: Infinity
    },
    property: {
        type: Types.ObjectId,
        ref: Models.Property,
        required: true
    },
    ...BaseSchema
}, options);


export default model(Models.RentalUnit, RentalUnitSchema);