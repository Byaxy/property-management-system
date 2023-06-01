import { IRentalUnitTenant, Models } from "@/utils";
import { Schema, Types, model } from "mongoose";

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
    isActive: {
        type: Boolean,
        default: true
    }
}, options);

export default model<IRentalUnitTenant>(Models.RentalUnitTenant, RentalUnitTenantSchema);