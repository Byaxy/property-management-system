import { Schema, model } from "mongoose";
import { IRentalUnit, Models, RENTAL_UNIT_TYPE, RENTAL_PERIODS, DEFAULT_MODEL_OPTIONS, addCommas } from "@/utils";

const RentalUnitSchema = new Schema<IRentalUnit>({
    unitNumber: {
        type: String,
        required: [true, "Unit number is required"]
    },
    unitType: {
        type: String,
        required: [true, "Unit type is required"],
        enum: {
            values: RENTAL_UNIT_TYPE,
            message: `Must be either ${addCommas(RENTAL_UNIT_TYPE)}`
        }
    },
    rentAmount: {
        type: Number,
        min: [0, "Rent amount cannot be negative"]
    },
    rentPeriod: {
        type: String,
        required: [true, "Rent period is required"],
        enum: {
            values: RENTAL_PERIODS,
            message: `Must be either ${addCommas(RENTAL_PERIODS)}`
        }
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: Models.Property,
        required: [true, "Property ID is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, DEFAULT_MODEL_OPTIONS);

// Property can't have duplicate rental unit numbers
RentalUnitSchema.index({ property: 1, unitNumber: -1 }, { unique: true });

export default model<IRentalUnit>(Models.RentalUnit, RentalUnitSchema);