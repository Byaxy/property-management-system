import { Models } from "@/utils/constants";
import { Schema, Types, model } from "mongoose";
import BaseSchema from "./BaseSchema";

const options = { timestamps: true };

const RentalUnitTenantSchema = new Schema({
    rentalUnit: {
        type: Types.ObjectId,
        ref: Models.RentalUnit,
        required: true
    },
    tenant: {
        type: Types.ObjectId,
        ref: Models.User,
        required: true
    },
    ...BaseSchema
}, options);

export default model(Models.RentalUnitTenant, RentalUnitTenantSchema);