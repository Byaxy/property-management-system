import PropertyManager from "@/model/PropertyManager";
import User from "@/model/User";
import { IPropertyManager, IUser, Roles, convertRequestErrorsToJson, statusMessages } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, attachProperties } = req.query;

    if (id === undefined) return res.writeHead(400, statusMessages[400]).end();

    switch(req.method) {
        case "GET":
            const query = { _id: id, roles: { $in: [Roles.Manager] } };
            let manager = await User.findOne(query);
            if (!manager) return res.writeHead(404, statusMessages[404]).end();

            if (attachProperties) {
                // See https://mongoosejs.com/docs/api/query.html#Query.prototype.populate()
                const properties = (await PropertyManager.find({ manager: id })
                    .populate("property"))
                    .map(p => p.property);
                
                return res.status(200).json({ manager, properties });
            }

            return res.status(200).json({ manager });
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