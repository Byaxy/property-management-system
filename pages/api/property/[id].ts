import Property from "@/model/Property";
import { convertRequestErrorsToJson, statusMessages } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (id === undefined) return res.writeHead(400, statusMessages[400]).end();

    switch(req.method) {
        case "GET":
            let property = (await Property.findOne({ _id: id }));
            if (property) return res.status(200).json(property);
            return res.writeHead(404, statusMessages[404]).end();
        case "PUT":
            try {
                let result = await Property.updateOne({ _id: id }, { $set: req.body }, { runValidators: true });
                if (result.modifiedCount) return res.status(200).end();
                return res.writeHead(404, statusMessages[404]).end();
            } catch(e) {
                let error = convertRequestErrorsToJson(e);
                if (error) return res.writeHead(400, statusMessages[400]).json(error);
                return res.writeHead(500, statusMessages[500]).end();
            }
        case "DELETE":
            let result = await Property.deleteOne({ _id: id });
            if (result.deletedCount) return res.status(200).end();
            return res.writeHead(404, statusMessages[404]).end();
        default:
            return res.writeHead(405, statusMessages[405])
                .setHeader("Allow", "GET, PUT, DELETE")
                .end();
    }
}