import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export default class DbConnection {
    private static mongod: MongoMemoryServer;

    // Prevent instantiation
    private constructor() {}

    static async connect() {
        if (process.env.NODE_ENV === "development") this.mongod = await MongoMemoryServer.create();

        const connState = mongoose.connection.readyState;
        
        if (connState !== mongoose.ConnectionStates.connected) {
            this.mongod = await MongoMemoryServer.create();
            // If in development, set overwriteModels to true to avoid OverwriteModelError
            // caused by next's Hot Module Replacement. See https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.set()
            if(process.env.NODE_ENV === "development") mongoose.set("overwriteModels", true);
            await mongoose.connect(this.mongod.getUri(), { dbName: process.env.DB_NAME });
        }
    }
}