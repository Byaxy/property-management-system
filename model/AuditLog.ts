import { IAuditLog, Models } from "@/utils";
import { Schema, model } from "mongoose";

const options = { timestamps: true };

const AuditLogSchema = new Schema<IAuditLog>({
    action: {
        type: String,
        required: true
    },
    performedBy: {
        type: Schema.Types.ObjectId,
        ref: Models.User,
        required: true
    }
}, options);

export default model(Models.AuditLog, AuditLogSchema);