import mongoose, { Types } from "mongoose";
import ManagerApi from "@/pages/api/manager"
import HttpMocks from "node-mocks-http";
import { mockUser } from "@/utils/mock-data";
import User from "@/model/User";
import { Roles } from "@/utils";

describe("tests /api/manager API endpoint", () => {
    let req;
    let res;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    })

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.disconnect();
    })

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    it("tests allowed methods", async () => {
        req.method = "HEAD";
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, POST");
    })

    it("creates a manager", async() => {
        req.method = "POST";
        req.body = { ...mockUser };
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");
    })

    it("gets managers", async() => {
        req.method = "GET";
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(Array.isArray(res._getJSONData())).toBe(true);
    })

    // it("checks if manager account has role manager", async() => {
    //     req.method = "GET";
    //     await ManagerApi(req, res);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.statusMessage).toEqual("OK");
    //     expect(res._getJSONData()[0].roles).toEqual([ Roles.Manager ]);
    // })

    // it("checks if manager account has password", async() => {
    //     req.method = "GET";
    //     await ManagerApi(req, res);
    //     expect(res.statusCode).toBe(200);
    //     expect(res.statusMessage).toEqual("OK");
    //     expect(res._getJSONData()[0].password).toBeDefined();
    // })
})