"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeEnum = exports.GuestDocumentTypeEnum = exports.DocumentTypeEnum = exports.LoginDeviceEnum = exports.TravelerSelectedEnum = exports.InstanceTypeEnum = exports.StatusEnum = exports.AccountTypeEnum = exports.GenderEnum = exports.TitleEnum = void 0;
var TitleEnum;
(function (TitleEnum) {
    TitleEnum["MR"] = "Mr";
    TitleEnum["MRS"] = "Mrs";
    TitleEnum["MISS"] = "Miss";
    TitleEnum["MS"] = "Ms";
    TitleEnum["DR"] = "Dr";
})(TitleEnum || (exports.TitleEnum = TitleEnum = {}));
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "male";
    GenderEnum["FEMALE"] = "female";
    GenderEnum["OTHER"] = "other";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var AccountTypeEnum;
(function (AccountTypeEnum) {
    AccountTypeEnum["GUEST"] = "guest";
    AccountTypeEnum["MEMBER"] = "member";
})(AccountTypeEnum || (exports.AccountTypeEnum = AccountTypeEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["CANCELLED"] = "cancelled";
    StatusEnum["ACTIVE"] = "active";
    StatusEnum["SUSPENDED"] = "suspended";
    StatusEnum["PENDING"] = "pending";
    StatusEnum["INACTIVE"] = "inactive";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
var InstanceTypeEnum;
(function (InstanceTypeEnum) {
    InstanceTypeEnum["VIP"] = "vip";
    InstanceTypeEnum["PRO"] = "pro";
    InstanceTypeEnum["ELITE"] = "elite";
    InstanceTypeEnum["GUEST"] = "guest";
    InstanceTypeEnum["PLUS"] = "plus";
})(InstanceTypeEnum || (exports.InstanceTypeEnum = InstanceTypeEnum = {}));
var TravelerSelectedEnum;
(function (TravelerSelectedEnum) {
    TravelerSelectedEnum["DEFAULT"] = "default";
    TravelerSelectedEnum["SELECTED"] = "selected";
    TravelerSelectedEnum["NOT_SELECTED"] = "not_selected";
})(TravelerSelectedEnum || (exports.TravelerSelectedEnum = TravelerSelectedEnum = {}));
var LoginDeviceEnum;
(function (LoginDeviceEnum) {
    LoginDeviceEnum["MOBILE"] = "mobile";
    LoginDeviceEnum["WEB"] = "web";
})(LoginDeviceEnum || (exports.LoginDeviceEnum = LoginDeviceEnum = {}));
var DocumentTypeEnum;
(function (DocumentTypeEnum) {
    DocumentTypeEnum["PASSPORT"] = "Passport";
    DocumentTypeEnum["ID"] = "ID";
    DocumentTypeEnum["DRIVING_LICENSE"] = "Driving License";
})(DocumentTypeEnum || (exports.DocumentTypeEnum = DocumentTypeEnum = {}));
var GuestDocumentTypeEnum;
(function (GuestDocumentTypeEnum) {
    GuestDocumentTypeEnum[GuestDocumentTypeEnum["PASSPORT"] = 0] = "PASSPORT";
    GuestDocumentTypeEnum[GuestDocumentTypeEnum["OTHER_DOCUMENT"] = 1] = "OTHER_DOCUMENT";
})(GuestDocumentTypeEnum || (exports.GuestDocumentTypeEnum = GuestDocumentTypeEnum = {}));
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum[UserTypeEnum["COMMON_USER"] = 1] = "COMMON_USER";
    UserTypeEnum[UserTypeEnum["CRUISE_USER"] = 2] = "CRUISE_USER";
    UserTypeEnum[UserTypeEnum["LIFE_EXPERIENCE_USER"] = 3] = "LIFE_EXPERIENCE_USER";
})(UserTypeEnum || (exports.UserTypeEnum = UserTypeEnum = {}));
//# sourceMappingURL=accounts.enum.js.map