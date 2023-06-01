import { IdType, Gender, IUser } from "@/utils";

// Mock data for unit tests
export const mockUser: IUser =  {
    firstName: "John",
    lastName: "Doe",
    identificationNumber: "A1289590",
    identificationType: IdType.PASSPORT,
    phoneNumber: "256712890456",
    gender: Gender.FEMALE,
    nationality: "Uganda"
}