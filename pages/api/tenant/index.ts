import { NextApiRequest, NextApiResponse } from "next";
import DbConnection from "@/utils/db";
import User from "@/model/User";
import { convertRequestErrorsToJson, statusMessages } from "@/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await DbConnection.connect();

    switch(req.method) {
        // GET all tenants
        case "GET":
            const tenants = await User.find({ roles: { $size: 0 } });
            return res.status(200).json(tenants);
        // Create a user
        case "POST":
            try {
                // Roles and id should not be assignable from the frontend
                const { roles, _id, ...rest } = req.body;
                await User.create(rest);
                return res.status(200).end();
            } catch(e) {
                // console.log(e);
                let error = convertRequestErrorsToJson(e);
                if (error) return res.writeHead(400, statusMessages[400]).json(error);
                return res.writeHead(500, statusMessages[500]).end();
            }
        default:
            return res.writeHead(405, statusMessages[405], { "Allow": "GET, POST" }).end();
    }
}