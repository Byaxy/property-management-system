import Property from "@/model/Property";
import PropertyManager from "@/model/PropertyManager";
import User from "@/model/User";
import { Roles, generatePassword, hashPassword } from "@/utils";
import { mockProperty, mockUser, mockUserB } from "@/utils/mock-data";
import mongoose, { Types } from "mongoose"
import HttpMocks from "node-mocks-http";
import PropertyManagerApi from "@/pages/api/property-manager/assign";

describe("tests the property-manager/assign API route", () => {
    let req;
    let res;
    let managers = new Array<Types.ObjectId>();
    let properties = new Array<Types.ObjectId>();

    beforeAll(async() => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
        // Create test data
        managers.push((await User.create({ ...mockUser, password: (await hashPassword(generatePassword())), roles: [ Roles.Manager ]}))._id);
        managers.push((await User.create({ ...mockUserB, password: (await hashPassword(generatePassword())), roles: [ Roles.Manager ]}))._id);
        properties.push((await Property.create(mockProperty))._id);
        properties.push((await Property.create({ ...mockProperty, name: "PropertyB" }))._id);
    })

    beforeEach(() => {
        req = HttpMocks.createRequest();
        res = HttpMocks.createResponse();
    })

    afterAll(async() => {
        // Clear all data inserted in DB during this test
        User.deleteMany({});
        Property.deleteMany({});
        PropertyManager.deleteMany({});
        await mongoose.disconnect();
    })

    it("tests allowed methods", async () => {
        req.method = "PUT";
        req.body = { manager: managers[0], property: properties[0] };
        await PropertyManagerApi(req, res);
        expect(res.statusCode).toBe(405);
        expect(res.statusMessage).toEqual("Method Not Allowed");
        expect(res.getHeader("Allow")).toEqual("POST, DELETE");
    })

    it("fails due to missing property and manager ID", async () => {
        req.method = "POST";
        await PropertyManagerApi(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.statusMessage).toEqual("Bad Request");
    })

    it("assigns a manager to a property", async() => {
        let payload = { manager: managers[0], property: properties[0] };
        req.method = "POST";
        req.body = { ...payload };
        await PropertyManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        // Check if data was inserted in DB
        const result = await PropertyManager.find({ ...payload, isActive: true });
        expect(result).toHaveLength(1);
        expect(result[0].manager).toEqual(payload.manager);
        expect(result[0].property).toEqual(payload.property);
    })

    it("unassigns old manager before assigning new manager", async() => {
        let payload = { manager: managers[1], property: properties[0] };
        req.method = "POST";
        req.body = { ...payload };
        await PropertyManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        // Check if property was assigned to new manager
        const result = await PropertyManager.find({ ...payload, isActive: true });
        expect(result).toHaveLength(1);
        expect(result[0].manager).toEqual(payload.manager);
        expect(result[0].property).toEqual(payload.property);
        // Check if old manager was unassigned from property
        const result2 = await PropertyManager.find({ manager: managers[0], property: properties[0], isActive: false });
        expect(result2).toHaveLength(1);
        expect(result2[0].manager).toEqual(managers[0]);
        expect(result2[0].property).toEqual(properties[0]);
    })

    it("does not create new assignment if previous one already existed", async() => {
        let payload = { manager: managers[1], property: properties[0] };
        req.method = "POST";
        req.body = { ...payload };
        await PropertyManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        const result = await PropertyManager.find({ ...payload });
        expect(result).toHaveLength(1);
    });

    it("unassigns manager from property", async() => {
        let payload = { manager: managers[1], property: properties[0] };
        req.method = "DELETE";
        req.body = { ...payload };
        await PropertyManagerApi(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.statusMessage).toEqual("OK");
        const result = await PropertyManager.find({ ...payload, isActive: false });
        expect(result).toHaveLength(1);
    })
})