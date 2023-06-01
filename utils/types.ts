import { Types } from "mongoose";

export enum Models {
    RentalUnit = "RentalUnit",
    Tenant = "Tenant",
    User = "User",
    Property = "Property",
    Manager = "Manager",
    ChatMessage = "ChatMessage",
    RentalUnitTenant = "RentalUnitTenant",
    AuditLog = "AuditLog",
    PropertyManager = "PropertyManager"
}

export enum Roles {
    Admin = "ADMIN",
    Manager = "MANAGER",
    Tenant = "TENANT"
}

export enum IdType {
    NATIONAL_ID = "National ID",
    PASSPORT = "Passport",
    DRIVING_LICENSE = "Driving License"
}

export enum Gender {
    MALE = "Male", 
    FEMALE = "Female",
    OTHER = "Other"
}

export enum EmploymentStatus {
    EMPLOYED = "Employed", 
    SELF_EMPLOYED = "Self-employed", 
    UNEMPLOYED = "Unemployed"
}

export enum MaritalStatus {
    MARRIED = "Married", 
    SINGLE = "Single", 
    DIVORCED = "Divorced", 
    WIDOWED = "Widowed", 
    SEPARATED = "Separated"
}

export enum RentalUnitType {
    SINGLE = "Single Room", 
    ONE_BEDROOM = "1 Bedroom", 
    TWO_BEDROOM = "2 Bedroom", 
    THREE_BEDROOM = "3 Bedroom"
}

export enum PropertyType {
    RENTAL = "Rental", 
    HOSTEL = "Hostel", 
    FURNISHED = "Furnished"
}

export enum RentalPeriods {
    SHORT_STAY = "Short stay", 
    PER_MONTH = "Per month", 
    PER_SEMESTER = "Per semester", 
    PER_DAY = "Per day"
}

export enum Crud {
    CREATE = "Create",
    READ = "Delete",
    UPDATE = "Update",
    DELETE = "Delete"
}

export interface IUser {
    firstName: string,
    lastName: string,
    identificationNumber: string,
    identificationType: IdType,
    email?: string,
    phoneNumber: string,
    gender: Gender,
    address?: string,
    city?: string,
    nationality: string,
    employmentStatus?: EmploymentStatus,
    occupation?: string,
    maritalStatus?: MaritalStatus,
    photo?: string,
    password?: string,
    roles?: Array<Roles>,
    isActive?: boolean
}

export interface IAuditLog {
    action: string,
    performedBy: Types.ObjectId
}

export interface IProperty {
    name: string,
    location: string,
    city: string,
    propertyType: PropertyType,
    numberOfUnits: Number,
    photos?: Array<String>,
    isActive: boolean
}

export interface IPropertyManager {
    propertyId: Types.ObjectId,
    managerId: Types.ObjectId,
    isActive: boolean
}

export interface IRentalUnit {
    unitNumber: string,
    unitType: RentalUnitType,
    rentAmount: Number,
    rentPeriod: RentalPeriods,
    propertyId: Types.ObjectId,
    isActive: boolean
}

export interface IRentalUnitTenant {
    rentalUnitId: Types.ObjectId,
    tenantId: Types.ObjectId,
    isActive: boolean
}