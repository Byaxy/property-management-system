import { Schema, model, Types } from "mongoose";
import { Models, RENTAL_UNIT_TYPE, RENTAL_PERIODS } from "@/utils/constants";
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
    rentAmount: {
        type: Number,
        min: 0
    },
    rentPeriod: {
        type: String,
        required: true,
        enum: RENTAL_PERIODS
    },
    property: {
        type: Types.ObjectId,
        ref: Models.Property,
        required: true
    },
    ...BaseSchema
}, options);


export default model(Models.RentalUnit, RentalUnitSchema);