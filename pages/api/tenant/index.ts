import { NextApiRequest, NextApiResponse } from "next";
import DbConnection from "@/utils/db";
import User from "@/model/User";
import { convertRequestErrorsToJson } from "@/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await DbConnection.connect();

    switch(req.method) {
        // GET all users
        case "GET":
            return res.send("users");
        // Create a user
        case "POST":
            try {
                // Roles should not be assignable from the frontend
                const { roles, ...rest } = req.body;
                await User.create(rest);
                return res.status(200).end();
            } catch(e) {
                let error = convertRequestErrorsToJson(e);
                if (error) return res.status(400).json(error);
                return res.status(500).end();
            }
        default:
            return res.status(405)
                .setHeader("Allow", "GET, POST, PUT, DELETE")
                .end();
    }
}