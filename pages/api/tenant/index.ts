import { NextApiRequest, NextApiResponse } from "next";
import DbConnection from "@/utils/db";
import User from "@/model/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await DbConnection.connect();

    switch(req.method) {
        case "GET":
            return res.send("users");
        case "POST":
            try {
                // Roles should not be assignable from the frontend
                const { roles, ...rest } = req.body;
                await User.create(rest);
                return res.status(200).end();
            } catch(e) {
                console.log(e);
                return res.status(400).end();
            }
        default:
            return res.status(405)
                .setHeader("Allow", "GET, POST, PUT, DELETE")
                .end();
    }
}