import { Models } from "@/utils/constants";
import { Schema, Types, model } from "mongoose";

const options = { timestamps: true };

const AuditLogSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    performedBy: {
        type: Types.ObjectId,
        ref: Models.User,
        required: true
    }
}, options);

export default model(Models.AuditLog, AuditLogSchema);