import PropertyManager from "@/model/PropertyManager";
import { statusMessages } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { property, manager } = req.body;

    if (!property || !manager) return res.writeHead(400, statusMessages[400]).end();

    switch(req.method) {
        case "POST":
            // Remove previous property manager
            await PropertyManager.updateOne({ property }, { $set: { isActive: false } });
            // Set new property manager
            await PropertyManager.findOneAndUpdate({ manager, property }, { isActive: true }, { upsert: true });
            return res.status(200).end();
        case "DELETE":
                // Remove previous property manager
                const result = await PropertyManager.updateOne({ manager, property }, { $set: { isActive: false } });
                if (!result.modifiedCount) return res.writeHead(404, statusMessages[404]).end();
                return res.status(200).end();
        default:
            return res.writeHead(405, statusMessages[405])
                .setHeader("Allow", "POST, DELETE")
                .end();
    }
}