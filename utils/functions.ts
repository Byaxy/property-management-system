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

// Join list contents using commas and a conjuction
export function addCommas(a: string[], conjuction: string = "or"): string {
    if (a.length < 2) return a.join();
    return `${a.slice(0, a.length - 1).join(", ")} ${conjuction} ${a.at(-1)}`;
}

// Serialize errors faced while processing requests to json
export function convertRequestErrorsToJson(e: mongoose.Error.ValidationError | MongoServerError /*| mongoose.Error.CastError*/): {} | null {
    const errors = {};
    if(e instanceof mongoose.Error.ValidationError) {
        Object.keys(e.errors).forEach(key => {
            const error = e.errors[key];
            errors[key] = {
                type: error.kind !== "required" ? "custom": error.kind,
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