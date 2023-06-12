import { NextApiRequest, NextApiResponse } from "next";
import DbConnection from "@/utils/db";
import { convertRequestErrorsToJson, statusMessages } from "@/utils";
import Property from "@/model/Property";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await DbConnection.connect();

    switch(req.method) {
        // GET all tenants
        case "GET":
            const properties = await Property.find();
            return res.status(200).json(properties);
        // Create a user
        case "POST":
            try {
                // Roles and id should not be assignable from the frontend
                const { roles, _id, ...rest } = req.body;
                await Property.create(rest);
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