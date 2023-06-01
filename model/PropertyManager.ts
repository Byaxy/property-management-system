import { Schema, Types, model } from "mongoose";
import { IPropertyManager, Models } from "@/utils";

const options = { timestamps: true };

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
}, options);

export default model(Models.PropertyManager, PropertyManagerSchema);