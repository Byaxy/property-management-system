import { NextApiRequest, NextApiResponse } from "next";
import DbConnection from "@/utils/db";
import User from "@/model/User";
import { Roles, convertRequestErrorsToJson, generatePassword, hashPassword, statusMessages } from "@/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await DbConnection.connect();

    switch(req.method) {
        // GET all managers
        case "GET":
            const result = await User.find({ roles: { $in: [ Roles.Manager ]} });
            return res.status(200).json(result);
        // Create a user
        case "POST":
            try {
                // Roles and id should not be assignable from the frontend
                const { roles, _id, ...rest } = req.body;
                rest.password = await hashPassword(generatePassword());
                rest.roles = [Roles.Manager];
                await User.create(rest);
                return res.writeHead(201, statusMessages[201]).end();
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