import mongoose from 'mongoose';
import User from '@/model/User';
import { mockUser } from "@/utils/mock-data";

describe("tests DB operations using User as test model", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    });

    afterAll(async () => {
        // One DB instance used for all tests. 
        // Clear DB for future tests
        await User.deleteMany({});
        await mongoose.disconnect();
    })

    it("creates a user", async () => {
        const user = await User.create(mockUser);
        expect(user).toBeDefined();
        // Check that isActive is filled with default value true
        expect(user.isActive).toBe(true);
    })

    it("gets normal user with no roles", async() => {
        const user = await User.findOne({ 
            firstName: mockUser.firstName, 
            roles: { $size: 0 }
        });
        expect(user).toBeDefined()
    })

    it("updates a user", async () => {
        const res = await User.updateOne({ firstName: mockUser.firstName }, { firstName: "Jane" });
        expect(res.modifiedCount).toBe(1);
        // Update mock user too
        mockUser.firstName = "Jane";
    })

    it("throws on duplicate user ID number", () => {
        return expect(async() => {
            await User.create(mockUser);
        }).rejects.toThrow()
    })

    it("deletes a user", async() => {
        const res = await User.deleteOne({ firstName: mockUser.firstName });
        expect(res.deletedCount).toBe(1);
    })
})