import HttpMocks from "node-mocks-http";
import User from "@/model/User";
import { mockUser } from "@/utils/mock-data";
import mongoose, { Types } from "mongoose";
import { statusMessages } from "@/utils";
import TenantApi from "@/pages/api/tenant/[id]";

describe("tests /api/tenants/id API endpoint", () => {
    let req;
    let res;
    let tenantId: Types.ObjectId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
        tenantId = (await User.create(mockUser))._id;
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
        await TenantApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual(statusMessages[400]);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("tests allowed methods", async () => {
        req.method = "POST";
        req.query = { id: tenantId };
        await TenantApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("fetches tenant by id", async() => {
        req.method = "GET";
        req.query = { id: tenantId };
        await TenantApi(req, res);
        expect(res.statusCode).toBe(200);
    })

    it("responds with 404 if tenant not found", async() => {
        req.method = "GET";
        req.query = { id: new Types.ObjectId() };
        await TenantApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("updates tenant data", async() => {
        req.method = "PUT";
        req.query = { id: tenantId };
        req.body = { ...mockUser, nationality: "Kenya" }
        await TenantApi(req, res);
        expect(res.statusCode).toBe(200);
        let tenant = await User.findOne({ _id: tenantId });
        expect(tenant.nationality).toEqual("Kenya")
    })

    it("responds with 404 if no target update tenant is found", async() => {
        req.method = "PUT";
        req.query = { id: new Types.ObjectId() };
        await TenantApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fails validation due to invalid field", async () => {
        req.method = "PUT";
        req.query = { id: tenantId };
        req.body = { ...mockUser, identificationType: "Invalid" }
        await TenantApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request")
    })

    it("deletes tenant data", async() => {
        req.method = "DELETE";
        req.query = { id: tenantId };
        await TenantApi(req, res);
        expect(res.statusCode).toBe(200);
        let tenant = await User.findOne({ _id: tenantId });
        expect(tenant).toBeNull();
    })

    it("responds with 404 if no target delete tenant is found", async() => {
        req.method = "DELETE";
        req.query = { id: new Types.ObjectId() };
        await TenantApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })
})