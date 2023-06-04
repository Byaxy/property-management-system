import { Schema, model } from "mongoose";
import { IRentalUnit, Models, RENTAL_UNIT_TYPE, RENTAL_PERIODS, DEFAULT_MODEL_OPTIONS } from "@/utils";

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
    property: {
        type: Schema.Types.ObjectId,
        ref: Models.Property,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, DEFAULT_MODEL_OPTIONS);


export default model<IRentalUnit>(Models.RentalUnit, RentalUnitSchema);