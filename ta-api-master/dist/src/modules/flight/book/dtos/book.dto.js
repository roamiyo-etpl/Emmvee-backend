"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookConfirmationDto = exports.BookDto = exports.GSTDetails = exports.ContactInfo = exports.Passenger = exports.PassengerDetail = exports.Document = exports.RouteDetails = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class RouteDetails {
    airline;
    departureCode;
    departureDate;
    departureTime;
    arrivalCode;
    arrivalDate;
    arrivalTime;
    bookingCode;
    flightNum;
}
exports.RouteDetails = RouteDetails;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Airline code',
        example: 'AA',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "airline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Departure airport code',
        example: 'LGA',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "departureCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Departure date',
        example: '2026-01-15',
        format: 'date',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "departureDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Departure time',
        example: '09:29 AM',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "departureTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Arrival airport code',
        example: 'ORD',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "arrivalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Arrival date',
        example: '2026-01-15',
        format: 'date',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "arrivalDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Arrival time',
        example: '11:10 AM',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "arrivalTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking class code',
        example: 'Q',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "bookingCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flight number',
        example: '3234',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RouteDetails.prototype, "flightNum", void 0);
class Document {
    documentType;
    documentNumber;
    expiryDate;
    country;
}
exports.Document = Document;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of travel document',
        example: 'P',
        enum: ['P', 'N', 'D'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Document.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document number',
        example: 'A1234567',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Document.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document expiry date',
        example: '2030-12-31',
        format: 'date',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], Document.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country that issued the document',
        example: 'US',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Document.prototype, "country", void 0);
class PassengerDetail {
    title;
    firstName;
    middleName;
    lastName;
}
exports.PassengerDetail = PassengerDetail;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger title',
        example: 'Mr',
        enum: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDetail.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger first name',
        example: 'John',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDetail.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger middle name',
        example: '',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDetail.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger last name',
        example: 'Doe',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDetail.prototype, "lastName", void 0);
class Passenger {
    passengerType;
    gender;
    passengerDetail;
    dateOfBirth;
    document;
    nationality;
    mobile;
    mobileCountryCode;
}
exports.Passenger = Passenger;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of passenger',
        example: 'ADT',
        enum: ['ADT', 'CHD', 'INF'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Passenger.prototype, "passengerType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger gender',
        example: 'M',
        enum: ['M', 'F'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Passenger.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger personal details',
        type: PassengerDetail,
        example: {
            title: 'Mr',
            firstName: 'John',
            middleName: 'Doe',
            lastName: 'Doe',
        },
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PassengerDetail),
    __metadata("design:type", PassengerDetail)
], Passenger.prototype, "passengerDetail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger date of birth',
        example: '1990-01-15',
        format: 'date',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Passenger.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Travel document information',
        type: Document,
        example: {
            documentType: 'Passport',
            documentNumber: 'A1234567',
            expiryDate: '2030-12-31',
            country: 'US',
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Document),
    __metadata("design:type", Document)
], Passenger.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger nationality',
        example: 'US',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Passenger.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger mobile number',
        example: '1234567890',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Passenger.prototype, "mobile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mobile country code',
        example: '+1',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Passenger.prototype, "mobileCountryCode", void 0);
class ContactInfo {
    title;
    firstName;
    middleName;
    lastName;
    gender;
    email;
    mobile;
    mobileCountryCode;
    postalCode;
}
exports.ContactInfo = ContactInfo;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Contact person title',
        example: 'Mr',
        enum: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact person name',
        example: 'John',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact person middle name',
        example: 'Doe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact person last name',
        example: 'Doe',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact person gender',
        example: 'M',
        enum: ['M', 'F'],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact email address',
        example: 'john.doe@example.com',
        format: 'email',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact mobile number',
        example: '1234567890',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "mobile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mobile country code',
        example: '+1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "mobileCountryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Postal/ZIP code',
        example: '10001',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactInfo.prototype, "postalCode", void 0);
class GSTDetails {
    gstCompanyAddress;
    gstCompanyContactNumber;
    gstCompanyName;
    gstNumber;
    gstCompanyEmail;
}
exports.GSTDetails = GSTDetails;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'GST company address',
        example: '123 Main Street',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GSTDetails.prototype, "gstCompanyAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'GST company contact number',
        example: '1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GSTDetails.prototype, "gstCompanyContactNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'GST company name',
        example: 'ABC Company Ltd.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GSTDetails.prototype, "gstCompanyName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'GST number',
        example: '27AAAAA0000A1Z5',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GSTDetails.prototype, "gstNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'GST company email',
        example: 'company@example.com',
        format: 'email',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], GSTDetails.prototype, "gstCompanyEmail", void 0);
class BookDto {
    solutionId;
    searchReqId;
    trackingId;
    providerCode;
    fareType;
    airTripType;
    airlineType;
    passengers;
    contact;
    routes;
    gst;
}
exports.BookDto = BookDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Solution ID for booking',
        example: '7e3294817ad26fe6a885ca3b57312dbd',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "solutionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search request ID',
        example: 'efc080e1-3989-427d-abd4-edc7c04d27ab',
        format: 'uuid',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tracking ID',
        example: 'bdd3ff73-5ee7-49fc-bafa-34ba0666bfb7',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "trackingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Provider code',
        example: 'PK',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "providerCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fare type',
        example: 'PUBLIC',
        enum: ['PUBLIC', 'PRIVATE', 'CORPORATE'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookDto.prototype, "fareType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'airTripType needed here.',
        example: 'oneway',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookDto.prototype, "airTripType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'airlineType received in search result, could be LCC, Non-LCC GDS etc.',
        example: 'LCC',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookDto.prototype, "airlineType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger information',
        type: [Passenger],
        example: [
            {
                passengerType: 'ADT',
                gender: 'M',
                passengerDetail: {
                    title: 'Mr',
                    firstName: 'John',
                    lastName: 'Doe',
                },
                dateOfBirth: '1990-01-15',
                document: {
                    documentType: 'P',
                    documentNumber: 'A1234567',
                    expiryDate: '2030-12-31',
                    country: 'US',
                },
                nationality: 'US',
                mobile: '1234567890',
                mobileCountryCode: '+1',
            },
            {
                passengerType: 'ADT',
                gender: 'F',
                passengerDetail: {
                    title: 'Ms',
                    firstName: 'Jane',
                    lastName: 'Doe',
                },
                dateOfBirth: '1992-03-20',
                document: {
                    documentType: 'P',
                    documentNumber: 'B7654321',
                    expiryDate: '2030-12-31',
                    country: 'US',
                },
                nationality: 'US',
                mobile: '1234567891',
                mobileCountryCode: '+1',
            },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Passenger),
    __metadata("design:type", Array)
], BookDto.prototype, "passengers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact information',
        type: ContactInfo,
        example: {
            title: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            gender: 'M',
            email: 'john.doe@example.com',
            mobile: '1234567890',
            mobileCountryCode: '+1',
            postalCode: '10001',
        },
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ContactInfo),
    __metadata("design:type", ContactInfo)
], BookDto.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Route information - array of flight segments for each leg of the journey',
        type: [RouteDetails],
        isArray: true,
        example: [
            [
                {
                    airline: 'AA',
                    departureCode: 'LGA',
                    departureDate: '2026-01-15',
                    departureTime: '09:29 AM',
                    arrivalCode: 'ORD',
                    arrivalDate: '2026-01-15',
                    arrivalTime: '11:10 AM',
                    bookingCode: 'Q',
                    flightNum: '3234',
                },
                {
                    airline: 'AA',
                    departureCode: 'ORD',
                    departureDate: '2026-01-15',
                    departureTime: '02:14 PM',
                    arrivalCode: 'LAX',
                    arrivalDate: '2026-01-15',
                    arrivalTime: '04:52 PM',
                    bookingCode: 'Q',
                    flightNum: '1204',
                },
            ],
        ],
    }),
    (0, class_validator_1.IsArray)({ each: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RouteDetails),
    __metadata("design:type", Array)
], BookDto.prototype, "routes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'GST details (optional - may be required based on flight/supplier)',
        type: GSTDetails,
        example: {
            gstCompanyAddress: '123 Main Street',
            gstCompanyContactNumber: '1234567890',
            gstCompanyName: 'ABC Company Ltd.',
            gstNumber: '27AAAAA0000A1Z5',
            gstCompanyEmail: 'company@example.com',
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => GSTDetails),
    __metadata("design:type", GSTDetails)
], BookDto.prototype, "gst", void 0);
class BookConfirmationDto {
    bookingId;
    bookingLogId;
}
exports.BookConfirmationDto = BookConfirmationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking ID',
        example: '1234567890',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookConfirmationDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking log ID',
        example: '1234567890',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookConfirmationDto.prototype, "bookingLogId", void 0);
//# sourceMappingURL=book.dto.js.map