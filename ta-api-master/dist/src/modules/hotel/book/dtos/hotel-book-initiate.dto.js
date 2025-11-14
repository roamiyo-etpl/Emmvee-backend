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
exports.HotelBookInitiateDto = exports.ContactDetailsDto = exports.PaymentDetailsDto = exports.PassengerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const accounts_enum_1 = require("../../../../shared/enums/accounts.enum");
class PassengerDto {
    type;
    title;
    roomId;
    age;
    firstName;
    middleName;
    lastName;
    email;
    dob;
    dialCode;
    mobileNo;
    nationality;
    pan;
    passportNumber;
    passportIssueDate;
    passportExpDate;
    passportIssuingCountry;
}
exports.PassengerDto = PassengerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger type (adult, child, infant)',
        example: 'adult',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger title (Mr, Miss, Mrs, Ms)',
        example: 'Mr',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger roomId (1,2,3)',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PassengerDto.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger age (required for child/infant)',
        example: 25,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], PassengerDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name',
        example: 'John',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'middle name',
        example: 'John',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name',
        example: 'Doe',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address',
        example: 'john.doe@example.com',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth',
        example: '2002-02-20',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'dial Code',
        example: '+91',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "dialCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number',
        example: '+1234567890',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "mobileNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nationality code',
        example: 'IN',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'In case of pax is providing PAN then we will consider only pax pan and Parent/Guardian details will be discarded. If pax PAN is incorrect then booking will be failed',
        example: 'CAMPA9865C',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "pan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'In case of pax is providing passport then we will consider only pax passport and Parent/Guardian details will be discarded. If pax passport is incorrect then booking will be failed',
        example: 'M736352',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "passportNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passport issue date a valid date',
        example: '2025-11-02T00:00:00Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "passportIssueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passport expiry date (must be after check-out date)',
        example: '2025-11-02T00:00:00Z',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "passportExpDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nationality code',
        example: 'IN',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerDto.prototype, "passportIssuingCountry", void 0);
class PaymentDetailsDto {
    gatewayName;
    paymentType;
    totalAmount;
    cashAmount;
    priceHashKey;
    paymentToken;
    paymentLogId;
}
exports.PaymentDetailsDto = PaymentDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment gateway name',
        example: 'stripe',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDetailsDto.prototype, "gatewayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment type',
        example: 'credit_card',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDetailsDto.prototype, "paymentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount',
        example: 360.00,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cash amount',
        example: 360.00,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PaymentDetailsDto.prototype, "cashAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price hash key',
        example: 'price_hash_key',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDetailsDto.prototype, "priceHashKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment token',
        example: 'tok_1234567890abcdef',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDetailsDto.prototype, "paymentToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment log ID',
        example: 'log_1234567890abcdef',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentDetailsDto.prototype, "paymentLogId", void 0);
class ContactDetailsDto {
    title;
    firstName;
    middleName;
    lastName;
    gender;
    email;
    dialCode;
    mobileNo;
    addressLine1;
    addressLine2;
    city;
    state;
    country;
    postalCode;
}
exports.ContactDetailsDto = ContactDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User title Mr, Miss, and Mrs',
        example: 'Mr',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(accounts_enum_1.TitleEnum),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name',
        example: 'John',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'middle name',
        example: 'John',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "middleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name',
        example: 'Doe',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact person/user gender male, female and other',
        example: 'male',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(accounts_enum_1.GenderEnum),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dialer Code as country wise',
        example: '+91',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "dialCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "mobileNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Address line 1',
        example: '123 Main Street',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "addressLine1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Address line 2',
        example: 'Apt 4B',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "addressLine2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City',
        example: 'New York',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State',
        example: 'NY',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country',
        example: 'United States',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Postal code',
        example: '10001',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDetailsDto.prototype, "postalCode", void 0);
class HotelBookInitiateDto {
    hotelId;
    supplierCode;
    searchReqId;
    rateKey;
    checkIn;
    checkOut;
    passengers;
    paymentDetails;
    contactDetails;
}
exports.HotelBookInitiateDto = HotelBookInitiateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hotel ID',
        example: '1863197',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelBookInitiateDto.prototype, "hotelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supplier code',
        example: 'TBO',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelBookInitiateDto.prototype, "supplierCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search request ID from previous search',
        example: 'search_req_12345',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelBookInitiateDto.prototype, "searchReqId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique booking identifier',
        example: 'booking_12345',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HotelBookInitiateDto.prototype, "rateKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Check-in date (YYYY-MM-DD)',
        example: '2026-05-15',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], HotelBookInitiateDto.prototype, "checkIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Check-out date (YYYY-MM-DD)',
        example: '2026-05-16',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], HotelBookInitiateDto.prototype, "checkOut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Passenger details',
        type: [PassengerDto],
        example: [
            {
                type: 'adult',
                title: 'Mr',
                roomId: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                dialCode: '+123',
                mobileNo: '9627000000',
                nationality: 'US',
                pan: 'CAMPA7654C'
            }
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PassengerDto),
    __metadata("design:type", Array)
], HotelBookInitiateDto.prototype, "passengers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payment details',
        type: PaymentDetailsDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PaymentDetailsDto),
    __metadata("design:type", PaymentDetailsDto)
], HotelBookInitiateDto.prototype, "paymentDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact details',
        type: ContactDetailsDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ContactDetailsDto),
    __metadata("design:type", ContactDetailsDto)
], HotelBookInitiateDto.prototype, "contactDetails", void 0);
//# sourceMappingURL=hotel-book-initiate.dto.js.map