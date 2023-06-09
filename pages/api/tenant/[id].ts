import User from "@/model/User";
import { convertRequestErrorsToJson, statusMessages } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (id === undefined) return res.writeHead(400, statusMessages[400]).end();

    switch(req.method) {
        case "GET":
            // https://mongoosejs.com/docs/api/query.html#Query.prototype.select()
            let tenant = (await User.findOne({ _id: id }).select("-roles"));
            if (tenant) return res.status(200).json(tenant);
            return res.writeHead(404, statusMessages[404]).end();
        case "PUT":
            try {
                let result = await User.updateOne({ _id: id }, { $set: req.body }, { runValidators: true });
                if (result.modifiedCount) return res.status(200).end();
                return res.writeHead(404, statusMessages[404]).end();
            } catch(e) {
                let error = convertRequestErrorsToJson(e);
                if (error) return res.writeHead(400, statusMessages[400]).json(error);
                return res.writeHead(500, statusMessages[500]).end();
            }
        case "DELETE":
            let result = await User.deleteOne({ _id: id });
            if (result.deletedCount) return res.status(200).end();
            return res.writeHead(404, statusMessages[404]).end();
        default:
            return res.writeHead(405, statusMessages[405])
                .setHeader("Allow", "GET, PUT, DELETE")
                .end();
    }
}