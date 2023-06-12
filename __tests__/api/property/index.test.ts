import HttpMocks from "node-mocks-http";
import PropertyApi from "@/pages/api/property";
import { PROPERTY_TYPES, addCommas } from "@/utils";
import { mockProperty } from "@/utils/mock-data";
import mongoose from "mongoose";
import Property from "@/model/Property";

describe("tests /api/property API endpoint", () => {
    let req;
    let res;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    })

    afterAll(async () => {
        await Property.deleteMany({});
        await mongoose.disconnect();
    })

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    it("tests allowed methods", async () => {
        req.method = "HEAD";
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, POST");
    })

    it("fails validation due missing required fields", async() => {
        req.method = "POST";
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getJSONData()).toEqual(
            {
                name: { type: 'required', message: 'Name is required' },
                location: { type: 'required', message: 'Location is required' },
                city: { type: 'required', message: 'City is required' },
                propertyType: { type: 'required', message: 'Property type is required' },
                numberOfUnits: { type: 'required', message: 'Number of units is required' },
            }
        )
    })

    it("fails validation due to present but invalid fields", async() => {
        req.method = "POST";
        req.body = { 
            ...mockProperty, 
            propertyType: "Invalid",
            numberOfUnits: 0
        };
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getJSONData()).toEqual(
            {
                numberOfUnits: {
                  type: 'custom',
                  message: 'Must be at least 1'
                },
                propertyType: {
                    type: 'custom',
                    message: `Must be either ${addCommas(PROPERTY_TYPES)}`
                }
            }
        );
    })

    it("successfully creates property and ignores the _id field", async() => {
        req.method = "POST";
        req.body = { ...mockProperty, _id: 1 }
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(201);
        expect(res.statusMessage).toEqual("Created");
    })

    it("gets properties", async() => {
        req.method = "GET";
        await PropertyApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        expect(Array.isArray(res._getJSONData())).toBe(true);
        expect(res._getJSONData().length).toBe(1);
    })
})