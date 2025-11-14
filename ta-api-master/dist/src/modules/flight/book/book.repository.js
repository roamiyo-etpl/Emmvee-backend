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
exports.BookRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bookings_entity_1 = require("../../../shared/entities/bookings.entity");
const flight_enum_1 = require("../../../shared/enums/flight/flight.enum");
const booking_logs_entity_1 = require("../../../shared/entities/booking-logs.entity");
const booking_additional_details_entity_1 = require("../../../shared/entities/booking-additional-details.entity");
const uuid_1 = require("uuid");
const generic_utility_1 = require("../../../shared/utilities/flight/generic.utility");
let BookRepository = class BookRepository extends typeorm_1.Repository {
    dataSource;
    constructor(dataSource) {
        super(bookings_entity_1.Booking, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async checkDuplicateBooking(reqParams) {
        const { booking, userId } = reqParams;
        const firstLeg = booking.routes[0];
        const lastLeg = booking.routes[booking.routes.length - 1];
        const firstSegment = firstLeg[0];
        const lastSegment = lastLeg[lastLeg.length - 1];
        const adultCount = booking.passengers.filter((p) => p.passengerType === flight_enum_1.PassengerType.ADULT).length;
        const childCount = booking.passengers.filter((p) => p.passengerType === flight_enum_1.PassengerType.CHILD).length;
        const infantCount = booking.passengers.filter((p) => p.passengerType === flight_enum_1.PassengerType.INFANT).length;
        console.log(firstSegment.departureDate);
        const existingBooking = await this.createQueryBuilder('booking')
            .where('booking.user_id = :userId', { userId })
            .andWhere('booking.origin_code @> ARRAY[:origin]::text[]', { origin: firstSegment.departureCode })
            .andWhere('booking.destination_code @> ARRAY[:destination]::text[]', { destination: lastSegment.arrivalCode })
            .andWhere('DATE(booking.checkin) = DATE(:checkin)', { checkin: new Date(firstSegment.departureDate) })
            .andWhere('DATE(booking.checkout) = DATE(:checkout)', { checkout: new Date(lastSegment.arrivalDate) })
            .andWhere('booking.supplier_name = :supplier', { supplier: booking.providerCode })
            .andWhere('booking.booking_status IN (:...statuses)', {
            statuses: [bookings_entity_1.BookingStatus.PENDING, bookings_entity_1.BookingStatus.INPROGRESS],
        })
            .andWhere('booking.journey_type = :journeyType', { journeyType: booking.airTripType })
            .andWhere("(booking.paxes->0->'adult'->>'count')::int = :adultCount", { adultCount })
            .andWhere("(booking.paxes->0->'child'->>'count')::int = :childCount", { childCount })
            .andWhere("(booking.paxes->0->'infant'->>'count')::int = :infantCount", { infantCount })
            .orderBy('booking.created_at', 'DESC')
            .getOne();
        return existingBooking;
    }
    async insertBooking(reqParams) {
        const { booking, userId, mwrLogId, currency } = reqParams;
        const bookingEntity = new bookings_entity_1.Booking();
        bookingEntity.supplier_name = booking.providerCode;
        bookingEntity.booking_date = new Date();
        bookingEntity.booking_status = bookings_entity_1.BookingStatus.INPROGRESS;
        bookingEntity.journey_type = booking.airTripType;
        bookingEntity.contact_details = {
            title: booking.contact.title,
            firstName: booking.contact.firstName,
            middleName: booking.contact.middleName || '',
            lastName: booking.contact.lastName,
            gender: booking.contact.gender,
            email: booking.contact.email,
            dialCode: booking.contact.mobileCountryCode,
            mobileNo: booking.contact.mobile,
        };
        const originCodes = [];
        const destinationCodes = [];
        booking.routes.forEach((leg) => {
            if (leg && leg.length > 0) {
                originCodes.push(leg[0].departureCode);
                destinationCodes.push(leg[leg.length - 1].arrivalCode);
            }
        });
        bookingEntity.origin_code = originCodes;
        bookingEntity.destination_code = destinationCodes;
        const firstLeg = booking.routes[0];
        const lastLeg = booking.routes[booking.routes.length - 1];
        if (firstLeg && firstLeg.length > 0) {
            bookingEntity.checkin = new Date(firstLeg[0].departureDate);
        }
        if (lastLeg && lastLeg.length > 0) {
            const lastSegment = lastLeg[lastLeg.length - 1];
            bookingEntity.checkout = new Date(lastSegment.arrivalDate);
        }
        bookingEntity.paxes = this.mapPassengersToPaxes(booking.passengers, booking.contact.email);
        bookingEntity.user_id = userId;
        bookingEntity.legacy_booking_id = 0;
        bookingEntity.module_type = 1;
        bookingEntity.mwr_log_id = mwrLogId;
        bookingEntity.booking_reference_id = `TA-${generic_utility_1.Generic.generateRandomString()}`;
        bookingEntity.search_id = booking.searchReqId;
        return this.save(bookingEntity);
    }
    async getBookingByBookingId(reqParams) {
        const { bookingId } = reqParams;
        const booking = await this.findOne({ where: { booking_id: bookingId } });
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    }
    async storeBookingLog(reqParams) {
        const { bookingRefId, userId, mwrLogId } = reqParams;
        const bookingLog = new booking_logs_entity_1.BookingLog();
        bookingLog.log_id = mwrLogId;
        bookingLog.booking_reference_id = bookingRefId;
        bookingLog.user_id = userId;
        bookingLog.data = {};
        bookingLog.is_verified = false;
        bookingLog.payment_status = booking_logs_entity_1.PaymentStatus.PENDING;
        bookingLog.transaction_id = null;
        bookingLog.created_at = new Date();
        bookingLog.updated_at = new Date();
        return this.dataSource.getRepository(booking_logs_entity_1.BookingLog).save(bookingLog);
    }
    async getBookingLogByBookingLogId(reqParams) {
        const { bookingLogId } = reqParams;
        if (!bookingLogId) {
            throw new Error('Booking log ID is required');
        }
        const logId = bookingLogId;
        const THIRTY_MINUTES = 30 * 60 * 1000;
        const thirtyMinAgo = new Date(Date.now() - THIRTY_MINUTES);
        const bookingLog = await this.dataSource.getRepository(booking_logs_entity_1.BookingLog).findOne({
            where: {
                log_id: logId,
                is_verified: false,
                created_at: (0, typeorm_1.MoreThanOrEqual)(thirtyMinAgo),
            },
        });
        if (!bookingLog) {
            throw new Error(`Booking log not found with ID: ${logId}`);
        }
        return bookingLog;
    }
    async updateBookingLogData(reqParams) {
        const { bookingLogId, data } = reqParams;
        const bookingLog = await this.dataSource.getRepository(booking_logs_entity_1.BookingLog).findOne({ where: { id: bookingLogId } });
        if (!bookingLog) {
            throw new Error('Booking log not found');
        }
        bookingLog.data = data;
        return this.dataSource.getRepository(booking_logs_entity_1.BookingLog).save(bookingLog);
    }
    async updateBookingWithSupplierDetails(reqParams) {
        const { bookingId, supplierDetails, bookingData, supplierResponse, bookingItem = 1 } = reqParams;
        const booking = await this.findOne({ where: { booking_id: bookingId } });
        if (!booking) {
            throw new Error('Booking not found');
        }
        const orderDetails = supplierDetails.orderDetails;
        const orderDetail = supplierDetails.orderDetail;
        const isRoundTrip = Array.isArray(orderDetails) && orderDetails.length > 1;
        if (isRoundTrip) {
            this.mapRoundTripOrderDetails(booking, orderDetails);
        }
        else if (orderDetails && !orderDetails.error) {
            const singleOrderDetail = Array.isArray(orderDetails) ? orderDetails[0] : orderDetails;
            this.mapSingleTripOrderDetails(booking, singleOrderDetail);
        }
        if (orderDetail && Array.isArray(orderDetail) && orderDetail.length > 0) {
            this.mapOrderDetailData(booking, orderDetail);
        }
        this.mapBasicBookingFields(booking);
        booking.updated_at = new Date();
        const savedBooking = await this.save(booking);
        if (bookingData && supplierResponse) {
            try {
                await this.createBookingAdditionalDetail({
                    bookingId,
                    bookingReferenceId: savedBooking.booking_reference_id,
                    supplierResponse,
                    bookingData,
                    orderDetails: isRoundTrip ? orderDetails : Array.isArray(orderDetails) ? orderDetails : [orderDetails],
                    bookingItem,
                });
            }
            catch (error) {
                console.error('Error creating booking additional details:', error);
            }
        }
        return savedBooking;
    }
    mapRoundTripOrderDetails(booking, orderDetailsArray) {
        const confirmedOrders = orderDetailsArray.filter((orderDetail) => orderDetail?.bookingStatus?.toLowerCase() === 'confirmed' || orderDetail?.bookingStatus === bookings_entity_1.BookingStatus.CONFIRMED || orderDetail?.bookingStatus === 'CONFIRMED');
        const ordersToProcess = confirmedOrders.length > 0 ? confirmedOrders : orderDetailsArray;
        const supplierRefs = [];
        const bookingRefs = [];
        let totalFare = 0;
        let totalPublicPrice = 0;
        let totalNetPrice = 0;
        let totalTax = 0;
        let currency = '';
        for (const orderDetail of ordersToProcess) {
            if (!orderDetail || orderDetail.error)
                continue;
            if (orderDetail.bookingId) {
                supplierRefs.push(orderDetail.bookingId.toString());
            }
            if (orderDetail.bookingRefNumber) {
                bookingRefs.push(orderDetail.bookingRefNumber);
            }
            else if (orderDetail.pnr) {
                bookingRefs.push(orderDetail.pnr);
            }
            if (orderDetail.bookingStatus) {
                const mappedStatus = this.mapBookingStatus(orderDetail.bookingStatus);
                if (mappedStatus === bookings_entity_1.BookingStatus.CONFIRMED) {
                    booking.booking_status = bookings_entity_1.BookingStatus.PENDING;
                }
                else if (booking.booking_status !== bookings_entity_1.BookingStatus.CONFIRMED) {
                    booking.booking_status = mappedStatus || bookings_entity_1.BookingStatus.PENDING;
                }
            }
            if (orderDetail.routes?.fare && orderDetail.routes.fare.length > 0) {
                const fare = orderDetail.routes.fare[0];
                if (fare.bsPublish !== undefined) {
                    totalPublicPrice += parseFloat(fare.bsPublish.toString()) || 0;
                }
                if (fare.bsFare !== undefined) {
                    totalNetPrice += parseFloat(fare.bsFare.toString()) || 0;
                }
                if (fare.bsPublish !== undefined) {
                    totalFare += parseFloat(fare.bsPublish.toString()) || 0;
                }
                else {
                    const currentBsFare = fare.bsFare ? parseFloat(fare.bsFare.toString()) : 0;
                    const currentTax = fare.tax ? parseFloat(fare.tax.toString()) : fare.bsTax ? parseFloat(fare.bsTax.toString()) : 0;
                    if (currentBsFare > 0 && currentTax > 0) {
                        totalFare += currentBsFare + currentTax;
                    }
                    else if (fare.totalFare) {
                        totalFare += parseFloat(fare.totalFare.toString()) || 0;
                    }
                }
                if (fare.sellingPrice && !fare.bsPublish) {
                    totalPublicPrice += parseFloat(fare.sellingPrice.toString()) || 0;
                }
                if (fare.baseFare && !fare.bsFare) {
                    totalNetPrice += parseFloat(fare.baseFare.toString()) || 0;
                }
                if (fare.tax) {
                    totalTax += parseFloat(fare.tax.toString()) || 0;
                }
                else if (fare.bsTax) {
                    totalTax += parseFloat(fare.bsTax.toString()) || 0;
                }
                if (fare.currency && !currency) {
                    currency = fare.currency;
                }
            }
            if (orderDetail.routes?.isRefundable) {
                booking.is_refundable = true;
            }
        }
        if (totalFare > 0) {
            booking.total = totalFare;
        }
        if (totalPublicPrice > 0) {
            booking.public_price = totalPublicPrice;
        }
        if (totalNetPrice > 0) {
            booking.net_price = totalNetPrice;
        }
        if (totalTax > 0) {
            booking.tax = totalTax;
        }
        if (currency) {
            booking.currency_code = currency;
        }
        if (totalPublicPrice > 0 && totalFare > 0 && totalPublicPrice > totalFare) {
            booking.savings_amount = totalPublicPrice - totalFare;
            booking.savings_percentage = ((booking.savings_amount / totalPublicPrice) * 100).toFixed(2);
        }
        if (supplierRefs.length > 0) {
            booking.supplier_reference_id = supplierRefs.join(',');
        }
        if (orderDetailsArray.length > 0) {
            this.mapRoundTripLocationDetails(booking, orderDetailsArray);
        }
    }
    mapSingleTripOrderDetails(booking, orderDetails) {
        if (!orderDetails || orderDetails.error)
            return;
        if (orderDetails.bookingId) {
            booking.supplier_reference_id = orderDetails.bookingId.toString();
        }
        if (orderDetails.bookingStatus) {
            const mappedStatus = this.mapBookingStatus(orderDetails.bookingStatus);
            if (mappedStatus !== undefined) {
                booking.booking_status = mappedStatus;
            }
        }
        if (orderDetails.routes?.fare && orderDetails.routes.fare.length > 0) {
            const fare = orderDetails.routes.fare[0];
            if (fare.bsPublish !== undefined) {
                booking.public_price = parseFloat(fare.bsPublish.toString()) || 0;
            }
            if (fare.bsFare !== undefined) {
                booking.net_price = parseFloat(fare.bsFare.toString()) || 0;
            }
            if (fare.bsPublish !== undefined) {
                booking.total = parseFloat(fare.bsPublish.toString()) || 0;
            }
            else {
                const bsFare = fare.bsFare ? parseFloat(fare.bsFare.toString()) : 0;
                const tax = fare.tax ? parseFloat(fare.tax.toString()) : fare.bsTax ? parseFloat(fare.bsTax.toString()) : 0;
                if (bsFare > 0 && tax > 0) {
                    booking.total = bsFare + tax;
                }
                else if (fare.totalFare) {
                    booking.total = parseFloat(fare.totalFare.toString()) || 0;
                }
            }
            if (fare.sellingPrice && !fare.bsPublish) {
                booking.public_price = parseFloat(fare.sellingPrice.toString()) || 0;
            }
            if (fare.baseFare && !fare.bsFare) {
                booking.net_price = parseFloat(fare.baseFare.toString()) || 0;
            }
            if (fare.tax) {
                booking.tax = parseFloat(fare.tax.toString()) || 0;
            }
            else if (fare.bsTax) {
                booking.tax = parseFloat(fare.bsTax.toString()) || 0;
            }
            if (fare.currency) {
                booking.currency_code = fare.currency;
            }
            const publicPrice = booking.public_price || 0;
            const totalPrice = booking.total || 0;
            if (publicPrice > 0 && totalPrice > 0 && publicPrice > totalPrice) {
                booking.savings_amount = publicPrice - totalPrice;
                booking.savings_percentage = ((booking.savings_amount / publicPrice) * 100).toFixed(2);
            }
        }
        if (orderDetails.routes?.isRefundable !== undefined) {
            booking.is_refundable = orderDetails.routes.isRefundable;
        }
        this.mapLocationDetails(booking, orderDetails, orderDetails);
    }
    mapRoundTripLocationDetails(booking, orderDetailsArray) {
        const originCodes = [];
        const destinationCodes = [];
        const originCities = [];
        const destinationCities = [];
        const originCountries = [];
        const destinationCountries = [];
        for (const orderDetail of orderDetailsArray) {
            if (!orderDetail?.routes?.flightSegments || orderDetail.routes.flightSegments.length === 0)
                continue;
            const segments = orderDetail.routes.flightSegments;
            const firstSegment = segments[0];
            const lastSegment = segments[segments.length - 1];
            if (firstSegment.departure && firstSegment.departure.length > 0) {
                const departureInfo = firstSegment.departure[0];
                originCodes.push(departureInfo.code);
                originCities.push(departureInfo.city || '');
                originCountries.push(departureInfo.country || '');
            }
            if (lastSegment.arrival && lastSegment.arrival.length > 0) {
                const arrivalInfo = lastSegment.arrival[0];
                destinationCodes.push(arrivalInfo.code);
                destinationCities.push(arrivalInfo.city || '');
                destinationCountries.push(arrivalInfo.country || '');
            }
        }
        if (originCodes.length > 0) {
            booking.origin_code = originCodes;
            booking.origin_city = originCities;
            booking.origin_country = originCountries;
        }
        if (destinationCodes.length > 0) {
            booking.destination_code = destinationCodes;
            booking.destination_city = destinationCities;
            booking.destination_country = destinationCountries;
        }
    }
    mapLocationDetails(booking, firstOrder, lastOrder) {
        const originCodes = [];
        const destinationCodes = [];
        const originCities = [];
        const destinationCities = [];
        const originCountries = [];
        const destinationCountries = [];
        const routes = firstOrder?.routes || lastOrder?.routes;
        if (routes?.departureInfo && Array.isArray(routes.departureInfo) && routes.departureInfo.length > 0) {
            routes.departureInfo.forEach((departure) => {
                if (departure?.code) {
                    originCodes.push(departure.code);
                    originCities.push(departure.city || '');
                    originCountries.push(departure.country || '');
                }
            });
        }
        if (routes?.arrivalInfo && Array.isArray(routes.arrivalInfo) && routes.arrivalInfo.length > 0) {
            routes.arrivalInfo.forEach((arrival) => {
                if (arrival?.code) {
                    destinationCodes.push(arrival.code);
                    destinationCities.push(arrival.city || '');
                    destinationCountries.push(arrival.country || '');
                }
            });
        }
        if (originCodes.length === 0 && firstOrder?.routes?.flightSegments && firstOrder.routes.flightSegments.length > 0) {
            const firstSegment = firstOrder.routes.flightSegments[0];
            if (firstSegment.departure && firstSegment.departure.length > 0) {
                const departureInfo = firstSegment.departure[0];
                originCodes.push(departureInfo.code);
                originCities.push(departureInfo.city || '');
                originCountries.push(departureInfo.country || '');
            }
        }
        if (destinationCodes.length === 0 && lastOrder?.routes?.flightSegments && lastOrder.routes.flightSegments.length > 0) {
            const segments = lastOrder.routes.flightSegments;
            const lastSegment = segments[segments.length - 1];
            if (lastSegment.arrival && lastSegment.arrival.length > 0) {
                const arrivalInfo = lastSegment.arrival[0];
                destinationCodes.push(arrivalInfo.code);
                destinationCities.push(arrivalInfo.city || '');
                destinationCountries.push(arrivalInfo.country || '');
            }
        }
        if (originCodes.length > 0) {
            booking.origin_code = originCodes;
            booking.origin_city = originCities;
            booking.origin_country = originCountries;
        }
        if (destinationCodes.length > 0) {
            booking.destination_code = destinationCodes;
            booking.destination_city = destinationCities;
            booking.destination_country = destinationCountries;
        }
    }
    mapBookingStatus(status) {
        const statusMap = {
            confirmed: bookings_entity_1.BookingStatus.CONFIRMED,
            booked: bookings_entity_1.BookingStatus.BOOKED,
            pending: bookings_entity_1.BookingStatus.PENDING,
            cancelled: bookings_entity_1.BookingStatus.CANCELLED,
            failed: bookings_entity_1.BookingStatus.FAILED,
        };
        return statusMap[status?.toLowerCase()];
    }
    mapOrderDetailData(booking, orderDetail) {
        const orderNos = orderDetail.map((order) => order.orderNo).filter(Boolean);
        if (orderNos.length > 0) {
            booking.supplier_reference_id = orderNos.join(',');
        }
        const hasPriceChange = orderDetail.some((order) => order.isPriceChanged);
        const hasScheduleChange = orderDetail.some((order) => order.isScheduleChanged);
        if (hasPriceChange || hasScheduleChange) {
            console.warn('Price or schedule changed for booking:', booking.booking_id);
        }
        if (!booking.total && orderDetail.length > 0) {
            const firstOrder = orderDetail[0];
            if (firstOrder.orderAmount) {
                booking.total = firstOrder.orderAmount;
                booking.public_price = firstOrder.orderAmount;
            }
            if (firstOrder.currency) {
                booking.currency_code = firstOrder.currency;
            }
            if (firstOrder.supplierBaseAmount) {
                booking.net_price = parseFloat(firstOrder.supplierBaseAmount) || 0;
            }
        }
    }
    mapBasicBookingFields(booking) {
        booking.module_type = 1;
        booking.booking_from = bookings_entity_1.BookingFrom.WEB;
        booking.is_verified = false;
    }
    extractPassportData(passengers) {
        const passengersWithPassport = passengers.filter((p) => p.document);
        if (passengersWithPassport.length === 0) {
            return null;
        }
        return {
            passengers: passengersWithPassport.map((p) => ({
                passengerName: `${p.passengerDetail.firstName} ${p.passengerDetail.lastName}`,
                passengerType: p.passengerType,
                documentType: p.document?.documentType,
                documentNumber: p.document?.documentNumber,
                documentExpiryDate: p.document?.expiryDate,
                passportIssuingCountry: p.document?.country,
                nationality: p.nationality,
            })),
        };
    }
    extractCancellationPolicy(fareRules) {
        if (!fareRules || fareRules.length === 0) {
            return null;
        }
        const policyText = fareRules
            .map((rule) => {
            const sections = [];
            if (rule.origin) {
                sections.push(`Origin: ${rule.origin}`);
            }
            if (rule.Destination) {
                sections.push(`Destination: ${rule.Destination}`);
            }
            if (rule.Airline) {
                sections.push(`Airline: ${rule.Airline}`);
            }
            if (rule.FlightNumber) {
                sections.push(`Flight Number: ${rule.FlightNumber}`);
            }
            if (rule.DepartureDate) {
                sections.push(`Departure Date: ${rule.DepartureDate}`);
            }
            if (rule.FareBasisCode) {
                sections.push(`Fare Basis Code: ${rule.FareBasisCode}`);
            }
            if (rule.FareRestriction) {
                sections.push(`Fare Restriction: ${rule.FareRestriction}`);
            }
            if (rule.FareRuleDetail) {
                sections.push(`\nFare Rule Details:\n${rule.FareRuleDetail}`);
            }
            return sections.join('\n');
        })
            .join('\n\n---\n\n');
        return policyText;
    }
    async createBookingAdditionalDetail(reqParams) {
        const { bookingId, bookingReferenceId, supplierResponse, bookingData, orderDetails, bookingItem = 1 } = reqParams;
        const existingDetail = await this.dataSource.getRepository(booking_additional_details_entity_1.BookingAdditionalDetail).findOne({
            where: { booking_id: bookingId },
        });
        let additionalDetail;
        if (existingDetail) {
            additionalDetail = existingDetail;
        }
        else {
            additionalDetail = new booking_additional_details_entity_1.BookingAdditionalDetail();
            additionalDetail.created_at = new Date();
        }
        additionalDetail.booking_id = bookingId;
        additionalDetail.booking_reference_id = bookingReferenceId;
        additionalDetail.booking_item = bookingItem;
        additionalDetail.add_booking_type = booking_additional_details_entity_1.AddBookingType.DEFAULT_BOOKING;
        additionalDetail.supplier_response = supplierResponse;
        additionalDetail.api_response = {
            booking: {
                request: bookingData.request,
                response: bookingData.response,
            },
            orderDetails,
        };
        if (orderDetails?.routes?.fareRules) {
            const cancellationPolicy = this.extractCancellationPolicy(orderDetails.routes.fareRules);
            if (cancellationPolicy) {
                additionalDetail.terms_cancellation_policy = cancellationPolicy;
            }
        }
        if (bookingData.request.passengers && bookingData.request.passengers.length > 0) {
            const passportData = this.extractPassportData(bookingData.request.passengers);
            if (passportData) {
                additionalDetail.passport_document_data = passportData;
            }
        }
        if (bookingData.request.gst) {
            additionalDetail.gst_details = {
                gstCompanyAddress: bookingData.request.gst.gstCompanyAddress,
                gstCompanyContactNumber: bookingData.request.gst.gstCompanyContactNumber,
                gstCompanyName: bookingData.request.gst.gstCompanyName,
                gstNumber: bookingData.request.gst.gstNumber,
                gstCompanyEmail: bookingData.request.gst.gstCompanyEmail,
            };
        }
        additionalDetail.updated_at = new Date();
        return this.dataSource.getRepository(booking_additional_details_entity_1.BookingAdditionalDetail).save(additionalDetail);
    }
    async verifyBookingLog(reqParams) {
        const { bookingLogId } = reqParams;
        if (!bookingLogId) {
            throw new Error('Booking log ID is required');
        }
        const bookingLog = await this.dataSource.getRepository(booking_logs_entity_1.BookingLog).findOne({ where: { log_id: bookingLogId } });
        if (!bookingLog) {
            throw new Error(`Booking log not found with ID: ${bookingLogId}`);
        }
        bookingLog.is_verified = true;
        bookingLog.payment_status = booking_logs_entity_1.PaymentStatus.CAPTURED;
        bookingLog.transaction_id = (0, uuid_1.v4)();
        bookingLog.updated_at = new Date();
        return this.dataSource.getRepository(booking_logs_entity_1.BookingLog).save(bookingLog);
    }
    mapPassengersToPaxes(passengers, contactEmail) {
        const adultPassengers = passengers.filter((p) => p.passengerType === flight_enum_1.PassengerType.ADULT);
        const childPassengers = passengers.filter((p) => p.passengerType === flight_enum_1.PassengerType.CHILD);
        const infantPassengers = passengers.filter((p) => p.passengerType === flight_enum_1.PassengerType.INFANT);
        const adultCount = adultPassengers.length;
        const childCount = childPassengers.length;
        const infantCount = infantPassengers.length;
        const adultData = adultPassengers.map((p) => ({
            age: generic_utility_1.Generic.calculateAge(p.dateOfBirth),
            dob: p.dateOfBirth,
            firstName: p.passengerDetail.firstName,
            middleName: p.passengerDetail.middleName,
            lastName: p.passengerDetail.lastName,
            title: p.passengerDetail.title,
            nationality: p.nationality,
            email: contactEmail,
            passport: p.document?.documentNumber,
            passportIssueDate: p.document?.expiryDate,
            passportExpDate: p.document?.expiryDate,
        }));
        const childData = childPassengers.map((p) => ({
            age: generic_utility_1.Generic.calculateAge(p.dateOfBirth),
            dob: p.dateOfBirth,
            firstName: p.passengerDetail.firstName,
            middleName: p.passengerDetail.middleName,
            lastName: p.passengerDetail.lastName,
            title: p.passengerDetail.title,
            nationality: p.nationality,
            email: contactEmail,
            passport: p.document?.documentNumber,
            passportIssueDate: p.document?.expiryDate,
            passportExpDate: p.document?.expiryDate,
        }));
        const infantData = infantPassengers.map((p) => ({
            age: generic_utility_1.Generic.calculateAge(p.dateOfBirth),
            dob: p.dateOfBirth,
            firstName: p.passengerDetail.firstName,
            middleName: p.passengerDetail.middleName,
            lastName: p.passengerDetail.lastName,
            title: p.passengerDetail.title,
            nationality: p.nationality,
            email: contactEmail,
            passport: p.document?.documentNumber,
            passportIssueDate: p.document?.expiryDate,
            passportExpDate: p.document?.expiryDate,
        }));
        return [
            {
                adult: {
                    count: adultCount,
                    data: adultData,
                },
                child: {
                    count: childCount,
                    data: childData,
                },
                infant: {
                    count: infantCount,
                    data: infantData,
                },
            },
        ];
    }
    async BookingStatusFailed(reqParams) {
        const { bookingId } = reqParams;
        const booking = await this.findOne({ where: { booking_id: bookingId } });
        if (!booking) {
            throw new Error('Booking not found');
        }
        booking.booking_status = bookings_entity_1.BookingStatus.FAILED;
        return this.save(booking);
    }
};
exports.BookRepository = BookRepository;
exports.BookRepository = BookRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BookRepository);
//# sourceMappingURL=book.repository.js.map