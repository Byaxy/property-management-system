import mongoose, { Types } from 'mongoose';
import Property from '@/model/Property';
import { mockManager, mockProperty } from "@/utils/mock-data";
import User from '@/model/User';
import { IProperty, IUser } from '@/utils';
import PropertyManager from '@/model/PropertyManager';

describe("tests DB operations related to property managers", () => {
    let propertyId: Types.ObjectId;
    let managerId: Types.ObjectId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
        propertyId = (await Property.create(mockProperty))._id;
        managerId = (await User.create(mockManager))._id;
    });

    afterAll(async () => {
        // One DB instance used for all tests. 
        // Clear DB for future tests
        await Property.deleteMany({});
        await User.deleteMany({});
        await PropertyManager.deleteMany({});
        await mongoose.disconnect();
    })

    it("assigns managers to a property", async() => {
        const res = await PropertyManager.create({ property: propertyId, manager: managerId });
        expect(res).toBeDefined()
    });

    it("gets properties managed by a particular manager given manager ID", async() => {
        const res = await PropertyManager.find({ manager: managerId }).populate("property");
        expect(res.length).toBe(1);
        const property = res[0].property as unknown as IProperty;
        expect(property.name).toEqual(mockProperty.name);
    })

    it("gets manager of a property given the property ID", async() => {
        const res = await PropertyManager.findOne({ property: propertyId }).populate("manager");
        expect(res).toBeDefined();
        const manager = res.manager as unknown as IUser;
        expect(manager.firstName).toEqual(mockManager.firstName);
    })
})