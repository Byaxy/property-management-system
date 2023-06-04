import { IdType, Gender, IUser, IRentalUnit, RentalUnitType, RentalPeriods, IProperty, PropertyType, Roles } from "@/utils";
import { Types } from "mongoose";

// Mock data for unit tests
export const mockUser: IUser =  {
    firstName: "John",
    lastName: "Doe",
    identificationNumber: "A1289590",
    identificationType: IdType.PASSPORT,
    phoneNumber: "256712890456",
    gender: Gender.MALE,
    nationality: "Uganda"
}

export const mockUserB: IUser =  {
    firstName: "Jane",
    lastName: "Doe",
    identificationNumber: "1237483B",
    identificationType: IdType.NATIONAL_ID,
    phoneNumber: "25671289895",
    gender: Gender.FEMALE,
    nationality: "Uganda"
}

export const mockRentalUnitA: IRentalUnit = {
    unitType: RentalUnitType.ONE_BEDROOM,
    rentAmount: 200,
    rentPeriod: RentalPeriods.PER_MONTH,
    unitNumber: "APT-01",
    property: new Types.ObjectId()
}

export const mockRentalUnitB: IRentalUnit = {
    unitType: RentalUnitType.TWO_BEDROOM,
    rentAmount: 300,
    rentPeriod: RentalPeriods.PER_MONTH,
    unitNumber: "APT-02",
    property: new Types.ObjectId()
}

export const mockProperty: IProperty = {
    name: "PropertyA",
    location: "LocationA",
    city: "Kampala",
    numberOfUnits: 12,
    propertyType: PropertyType.RENTAL
}

export const mockManager: IUser = {
    firstName: "Manager",
    lastName: "One",
    identificationNumber: "12374317",
    identificationType: IdType.DRIVING_LICENSE,
    phoneNumber: "256712895783",
    gender: Gender.MALE,
    nationality: "Uganda",
    roles: [Roles.Manager]
}