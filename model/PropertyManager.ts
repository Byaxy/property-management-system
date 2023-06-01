import { Schema, Types, model } from "mongoose";
import { IPropertyManager, Models, DEFAULT_MODEL_OPTIONS } from "@/utils";

const PropertyManagerSchema = new Schema<IPropertyManager>({
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: Models.Property,
        required: true,
        validate: {
            validator: function(value: Types.ObjectId) {
                // Ensure senderId != receiverId
                return !value.equals(this.managerId);
            }
        }
    },
    managerId: {
        type: Schema.Types.ObjectId,
        ref: Models.User,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, DEFAULT_MODEL_OPTIONS);

export default model<IPropertyManager>(Models.PropertyManager, PropertyManagerSchema);