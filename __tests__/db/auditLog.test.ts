import mongoose, { Types } from 'mongoose';
import User from '@/model/User';
import { mockUser } from '@/utils/mock-data';
import AuditLog from '@/model/AuditLog';

describe("tests one-to-one rel between audit-log and its creator", () => {
    let userId: Types.ObjectId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
        // Insert test user in db
        userId = (await User.create(mockUser))._id;
    });

    afterAll(async () => {
        // One DB instance used for all tests. 
        // Clear DB for future tests
        await User.deleteMany({});
        await AuditLog.deleteMany({});
        
        await mongoose.disconnect();
    })

    it("saves audit-log with creator attached", async () => {
        const log = await AuditLog.create({ 
            action: "Drank 2 large",
            performedBy: userId
        });

        expect(log.performedBy).toEqual(userId);
    })
})