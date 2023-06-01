import { Schema, model, Types } from "mongoose";
import { IRentalUnit, Models, RENTAL_UNIT_TYPE, RENTAL_PERIODS } from "@/utils";

const options = { timestamps: true };

const RentalUnitSchema = new Schema<IRentalUnit>({
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
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: Models.Property,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, options);


export default model<IRentalUnit>(Models.RentalUnit, RentalUnitSchema);