import HttpMocks from "node-mocks-http";
import Property from "@/model/Property";
import { mockProperty } from "@/utils/mock-data";
import mongoose, { Types } from "mongoose";
import { statusMessages } from "@/utils";
import PropertyApi from "@/pages/api/property/[id]";

describe("tests /api/property/id API route", () => {
    let req;
    let res;
    let propertyId: Types.ObjectId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
        propertyId = (await Property.create(mockProperty))._id;
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
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual(statusMessages[400]);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("tests allowed methods", async () => {
        req.method = "POST";
        req.query = { id: propertyId };
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, PUT, DELETE");
    })

    it("fetches property by id", async() => {
        req.method = "GET";
        req.query = { id: propertyId };
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(200);
    })

    it("responds with 404 if property not found", async() => {
        req.method = "GET";
        req.query = { id: new Types.ObjectId() };
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("updates property data", async() => {
        req.method = "PUT";
        req.query = { id: propertyId };
        req.body = { ...mockProperty, name: "PropertyB" }
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(200);
        let property = await Property.findOne({ _id: propertyId });
        expect(property.name).toEqual("PropertyB")
    })

    it("responds with 404 if no target update property is found", async() => {
        req.method = "PUT";
        req.query = { id: new Types.ObjectId() };
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })

    it("fails validation due to invalid field", async () => {
        req.method = "PUT";
        req.query = { id: propertyId };
        req.body = { ...mockProperty, propertyType: "Invalid" }
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request")
    })

    it("deletes property data", async() => {
        req.method = "DELETE";
        req.query = { id: propertyId };
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(200);
        let property = await Property.findOne({ _id: propertyId });
        expect(property).toBeNull();
    })

    it("responds with 404 if no target delete property is found", async() => {
        req.method = "DELETE";
        req.query = { id: new Types.ObjectId() };
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(404);
        expect(res.statusMessage).toEqual("Not Found");
    })
})