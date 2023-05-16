import { Mongoose, connect } from "mongoose";

export default class DbConnection {
  private static connection: Promise<Mongoose> = null;

  private constructor() {

  }

  public static async getInstance() {
    if (this.connection == null) {
      this.connection = connect(process.env.MONGODB_URI, {
        dbName: "property_management",
        user: "",
        pass: ""
      });
    }
    return this.connection
  }
}