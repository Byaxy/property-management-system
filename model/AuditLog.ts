import { IAuditLog, Models, DEFAULT_MODEL_OPTIONS } from "@/utils";
import { Schema, model,SchemaOptions } from "mongoose";

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
}, DEFAULT_MODEL_OPTIONS);

export default model<IAuditLog>(Models.AuditLog, AuditLogSchema);