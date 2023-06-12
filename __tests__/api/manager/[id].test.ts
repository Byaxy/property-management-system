import HttpMocks from "node-mocks-http";
import User from "@/model/User";
import { mockProperty, mockUser } from "@/utils/mock-data";
import mongoose, { Types } from "mongoose";
import { Roles, generatePassword, hashPassword, statusMessages } from "@/utils";
import ManagerApi from "@/pages/api/manager/[id]";
import Property from "@/model/Property";
import PropertyManager from "@/model/PropertyManager";

describe("tests /api/managers/id API route", () => {
    let req;
    let res;
    let managerId: Types.ObjectId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
        managerId = (await User.create(
            {
                ...mockUser, 
                password: (await hashPassword(generatePassword())), 
                roles: [Roles.Manager]
            }
        ))._id;
        await PropertyManager.create({ 
            property: (await Property.create(mockProperty))._id, 
            manager: managerId 
        });
    })

    afterAll(async () => {
        await mongoose.disconnect();
    })

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    it("fails due to missing id param", async () => {
        req.method = "GET";
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual(statusMessages[400]);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("tests allowed methods", async () => {
        req.method = "POST";
        req.query = { id: managerId };
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("fetches manager by id", async() => {
        req.method = "GET";
        req.query = { id: managerId };
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData().properties).toBeUndefined();
    })

    it("fetches manager and his properties", async() => {
        req.method = "GET";
        req.query = { id: managerId, attachProperties: true };
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData().properties).toBeDefined();
        expect(res._getJSONData().properties).toHaveLength(1);
    })

    it("responds with 404 if manager not found", async() => {
        req.method = "GET";
        req.query = { id: new Types.ObjectId() };
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("updates manager data", async() => {
        req.method = "PUT";
        req.query = { id: managerId };
        req.body = { ...mockUser, nationality: "Kenya" }
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        let manager = await User.findOne({ _id: managerId });
        expect(manager.nationality).toEqual("Kenya")
    })

    it("responds with 404 if no target update manager is found", async() => {
        req.method = "PUT";
        req.query = { id: new Types.ObjectId() };
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fails validation due to invalid field", async () => {
        req.method = "PUT";
        req.query = { id: managerId };
        req.body = { ...mockUser, identificationType: "Invalid" }
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request")
    })

    it("deletes manager data", async() => {
        req.method = "DELETE";
        req.query = { id: managerId };
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        let manager = await User.findOne({ _id: managerId });
        expect(manager).toBeNull();
    })

    it("responds with 404 if no target delete manager is found", async() => {
        req.method = "DELETE";
        req.query = { id: new Types.ObjectId() };
        await ManagerApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })
})