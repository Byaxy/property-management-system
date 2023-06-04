import mongoose, { Types } from 'mongoose';
import Property from '@/model/Property';
import { mockProperty, mockRentalUnitA, mockRentalUnitB, mockUser } from "@/utils/mock-data";
import RentalUnit from '@/model/RentalUnit';
import User from '@/model/User';
import RentalUnitTenant from '@/model/RentalUnitTenant';
import { IRentalUnit, IUser } from '@/utils';

describe("tests DB operations related to renting", () => {
    let propertyId: Types.ObjectId;
    let rentalUnitAId: Types.ObjectId;
    let rentalUnitBId: Types.ObjectId;
    let tenantId: Types.ObjectId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    });

    afterAll(async () => {
        // One DB instance used for all tests. 
        // Clear DB for future tests
        await Property.deleteMany({});
        await RentalUnit.deleteMany({});
        await User.deleteMany({});
        await RentalUnitTenant.deleteMany({});
        await mongoose.disconnect();
    })

    it("creates a property", async() => {
        const res = await Property.create(mockProperty)
        expect(res._id).toBeDefined();
        propertyId = res._id;
    })

    it("creates rental units and assigns them to a property", async() => {
        const rentalUnits = await RentalUnit.insertMany([
            { ...mockRentalUnitA, property: propertyId },
            { ...mockRentalUnitB, property: propertyId }
        ]);
        expect(rentalUnits.length).toBe(2);
        rentalUnitAId = rentalUnits[0]._id;
        rentalUnitBId = rentalUnits[1]._id;
    })

    it("throws on dupliate rental unit name in property", () => {
        expect(async() => {
            await RentalUnit.create({ ...mockRentalUnitA, property: propertyId });
        }).rejects.toThrow();
    })

    it("archives a rental unit", async() => {
        const res = await RentalUnit.updateOne({ _id: rentalUnitBId }, { isActive: false });
        expect(res.modifiedCount).toBe(1);
    })

    it("gets units belonging to a property given its id", async() => {
        const res = await RentalUnit.find({ property: propertyId });
        expect(res.length).toBe(2);
        expect(res[0].property).toEqual(propertyId);
        expect(res[1].property).toEqual(propertyId);
    })

    it("gets rental units and populates parent property details", async() => {
        const res = await RentalUnit.find({ property: propertyId }).populate("property");
        expect(res[0].property).toBeDefined();
        expect(res[1].property).toBeDefined();
    })

    it("assigns a tenant to a rental unit", async() => {
        const tenant = await User.create(mockUser);
        const rentedUnit = await RentalUnitTenant.create({ rentalUnit: rentalUnitAId, tenant: tenant._id });
        expect(rentedUnit._id).toBeDefined();
        tenantId = tenant._id;
    })

    it("fetches rented units and the tenants", async() => {
        const res = await RentalUnitTenant.find({ rentalUnit: rentalUnitAId })
            .populate("rentalUnit")
            .populate("tenant")
        expect(res.length).toBe(1);
        const rentedUnit = res[0].rentalUnit as unknown as IRentalUnit;
        const tenant = res[0].tenant as unknown as IUser;
        expect(rentedUnit.unitNumber).toEqual(mockRentalUnitA.unitNumber)
        expect(tenant.firstName).toEqual(mockUser.firstName);
    })
})