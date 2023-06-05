import mongoose from "mongoose";

interface MongoServerError {
    code: Number,
    index: Number,
    keyPattern: {
        [key: string]: Number
    },
    keyValue: {
        [key: string]: string
    }
}

export function addCommas(a: string[]): string {
    if (a.length < 2) return a.join();
    return `${a.slice(0, a.length - 1).join(", ")} or ${a.at(-1)}`;
}

export function convertRequestErrorsToJson(e: mongoose.Error.ValidationError | MongoServerError /*| mongoose.Error.CastError*/): {} | null {
    const errors = {};
    if(e instanceof mongoose.Error.ValidationError) {
        Object.keys(e.errors).forEach(key => {
            const error = e.errors[key];
            errors[key] = {
                type: error.kind,
                message: error.message
            }
        });
        return errors;
    } else if(e.code === 11000) {
        // Duplicate error
        let key = Object.keys(e.keyPattern)[0];
        errors[key] = {
            type: "custom",
            message: `Please provide unique ${key}. Received ${e.keyValue[key]}`
        }
    }
    if (Object.keys(errors).length) return errors;
    return null;
}