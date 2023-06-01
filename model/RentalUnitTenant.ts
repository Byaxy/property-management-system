import { IRentalUnitTenant, Models, DEFAULT_MODEL_OPTIONS } from "@/utils";
import { Schema, Types, model } from "mongoose";

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
    isActive: {
        type: Boolean,
        default: true
    }
}, DEFAULT_MODEL_OPTIONS);

export default model<IRentalUnitTenant>(Models.RentalUnitTenant, RentalUnitTenantSchema);