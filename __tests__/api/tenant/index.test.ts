import HttpMocks from "node-mocks-http";
import TenantApi from "@/pages/api/tenant";
import { EMPLOYMENT_STATUS, IDENTIFICATION_TYPE, MARITAL_STATUS, addCommas, statusMessages } from "@/utils";
import { mockUser } from "@/utils/mock-data";
import mongoose from "mongoose";
import User from "@/model/User";

describe("tests /api/tenants API endpoint", () => {
    let req;
    let res;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    })

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.disconnect();
    })

    beforeEach(async () => {
        await User.deleteMany({});
    })

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    it("tests allowed methods", async () => {
        req.method = "HEAD";
        await TenantApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("GET, POST");
    })

    it("fails validation due missing required fields", async() => {
        req.method = "POST";
        await TenantApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getJSONData()).toEqual(
            {
                phoneNumber: { type: 'required', message: 'Phone number is required' },
                lastName: { type: 'required', message: 'Last name is required' },
                firstName: { type: 'required', message: 'First name is required' }
            }
        )
    })

    it("fails validation due to present but invalid fields", async() => {
        req.method = "POST";
        req.body = { 
            ...mockUser, 
            email: "test", 
            phoneNumber: "253869", 
            nationality: "invalid",
            gender: "Invalid",
            identificationType: "Invalid",
            employmentStatus: "Invalid",
            maritalStatus: "Invalid"
        };
        await TenantApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
        expect(res._getJSONData()).toEqual(
            {
                email: {
                  type: 'custom',
                  message: 'test is not a valid email'
                },
                phoneNumber: {
                    type: 'custom',
                    message: '253869 is not a valid phone number'
                },
                nationality: {
                    type: 'custom',
                    message: 'Please pick a country from the provided list'
                },
                gender: {
                    type: 'custom',
                    message: 'Must be either Male, Female or Other'
                },
                identificationType: {
                    type: 'custom',
                    message: `Must be either ${addCommas(IDENTIFICATION_TYPE)}`
                },
                employmentStatus: {
                    type: 'custom',
                    message: `Must be either ${addCommas(EMPLOYMENT_STATUS)}`
                },
                maritalStatus: {
                    type: 'custom',
                    message: `Must be either ${addCommas(MARITAL_STATUS)}`
                }
            }
        );
    })

    
    it("fails due to non-unique fields", async() => {
        req.method = "POST";
        req.body = { ...mockUser };
        await TenantApi(req, res);

        const req1 = HttpMocks.createRequest();
        const res1 = HttpMocks.createResponse();
        req1.method = "POST";
        req1.body = { ...mockUser };

        await TenantApi(req1, res1);
        expect(res1.statusCode).toBe(400);
        expect(res1.statusMessage).toEqual("Bad Request");
        expect(res1._getJSONData()).toEqual(
            {
                identificationNumber: {
                    type: "custom",
                    message: `Please provide unique identificationNumber. Received ${mockUser.identificationNumber}`
                }
            }
        );
    })

    it("successfully creates tenant and ignores the _id field", async() => {
        req.method = "POST";
        req.body = { ...mockUser, _id: 1 }

        await TenantApi(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
    })
})