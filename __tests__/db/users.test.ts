import mongoose from 'mongoose';
import User from '@/model/User';
import { Gender, IUser, IdType } from '@/utils';

describe("tests CRUD operations on users collection", () => {
    const mockUser: IUser =  {
        firstName: "John",
        lastName: "Doe",
        identificationNumber: "A1289590",
        identificationType: IdType.PASSPORT,
        phoneNumber: "256712890456",
        gender: Gender.FEMALE,
        nationality: "Uganda"
    }

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    })

    it("creates a user", async () => {
        const user = new User(mockUser);
        await user.save();
        const queryResults = await User.find().exec();
        expect(queryResults.length).toBe(1);
    })

    it("fills default values", async() => {
        const user = await User.findOne({ firstName: mockUser.firstName });
        expect(user.isActive).toBe(true);
    })

    // No need for read operation test. Test above does it when
    // checking whether was successful default values were added

    it("updates a user", async () => {
        const res = await User.updateOne({ firstName: mockUser.firstName }, { firstName: "Jane" });
        expect(res.modifiedCount).toBe(1);
        // Update mock user too
        mockUser.firstName = "Jane";
    })

    it("deletes a user", async() => {
        const res = await User.deleteOne({ firstName: mockUser.firstName });
        expect(res.deletedCount).toBe(1);
    })
})