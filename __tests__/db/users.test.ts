import mongoose from 'mongoose';
import User from '@/model/User';
import { mockUser } from "@/utils/mock-data";

describe("tests CRUD operations using User as test model", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    })

    it("creates a user", async () => {
        const user = await User.create(mockUser);
        expect(user).toBeDefined();
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