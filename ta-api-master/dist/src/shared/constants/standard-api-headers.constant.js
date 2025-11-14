"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEC_HEADER_DEVICE_INFORMATION_MANDATE = exports.DEC_HEADER_LANGUAGE_PREFERENCE_MANDATE = exports.DEC_HEADER_CURRENCY_PREFERENCE_MANDATE = exports.DEC_HEADER_API_VERSION_MANDATE = exports.DEC_HEADER_IP_ADDRESS_MANDATE = exports.DEC_HEADER_CLUB_ID_MANDATE = exports.SWG_HEADER_DEVICE_INFORMATION_MANDATE = exports.SWG_HEADER_CLUB_ID_MANDATE = exports.SWG_HEADER_LANGUAGE_PREFERENCE_MANDATE = exports.SWG_HEADER_CURRENCY_PREFERENCE_MANDATE = exports.SWG_HEADER_CURRENCY_PREFERENCE = exports.SWG_HEADER_IP_MANDATE = exports.SWG_HEADER_IP_NON_MANDATE = exports.SWG_HEADER_API_VERSION_MANDATE = void 0;
exports.SWG_HEADER_API_VERSION_MANDATE = {
    name: 'Api-version',
    enum: ['v1'],
    description: 'Please enter API version.',
    required: true,
};
exports.SWG_HEADER_IP_NON_MANDATE = {
    name: 'Ip-Address',
    description: 'Please enter IP address. (e.g., 127.0.0.1)',
    required: false,
};
exports.SWG_HEADER_IP_MANDATE = {
    name: 'Ip-Address',
    description: 'Please enter IP address. (e.g., 127.0.0.1)',
    required: true,
};
exports.SWG_HEADER_CURRENCY_PREFERENCE = {
    name: 'Currency-Preference',
    description: 'Please enter preferred currency code. (3 digit currency code)',
    required: true,
};
exports.SWG_HEADER_CURRENCY_PREFERENCE_MANDATE = {
    name: 'Currency-Preference',
    description: 'Please enter preferred currency code. (3 digit currency code)',
    required: true,
};
exports.SWG_HEADER_LANGUAGE_PREFERENCE_MANDATE = {
    name: 'language',
    description: 'Please enter preferred language. (e.g., english,french)',
    required: true,
};
exports.SWG_HEADER_CLUB_ID_MANDATE = {
    name: 'Club-Id',
    description: 'Please enter club id.',
    required: true,
};
exports.SWG_HEADER_DEVICE_INFORMATION_MANDATE = {
    name: 'Device-Information',
    description: 'Please enter device-information id.',
    required: true,
};
exports.DEC_HEADER_CLUB_ID_MANDATE = 'Club-Id';
exports.DEC_HEADER_IP_ADDRESS_MANDATE = 'Ip-Address';
exports.DEC_HEADER_API_VERSION_MANDATE = 'Api-version';
exports.DEC_HEADER_CURRENCY_PREFERENCE_MANDATE = 'Currency-Preference';
exports.DEC_HEADER_LANGUAGE_PREFERENCE_MANDATE = 'Language';
exports.DEC_HEADER_DEVICE_INFORMATION_MANDATE = 'Device-information';
//# sourceMappingURL=standard-api-headers.constant.js.map