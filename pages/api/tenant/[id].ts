import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    switch(req.method) {
        case "GET":
            res.send(id)
            break;
        case "POST":
            res.send(id)
            break;
        case "PUT":
            res.send(id)
            break;
        case "DELETE":
            res.send(id)
            break;
        default:
            res.status(405)
                .setHeader("Allow", "GET, POST, PUT, DELETE")
                .end();
            // res.statusMessage = "Method Not Allowed";
    }
}