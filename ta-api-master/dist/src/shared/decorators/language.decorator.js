"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const common_1 = require("@nestjs/common");
const language_utility_1 = require("../utilities/language/language.utility");
exports.Language = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const langHeader = request.header('language');
    const language = typeof langHeader === 'string' ? langHeader.toLowerCase() : 'english';
    return (0, language_utility_1.getLanguageDictionary)(language);
});
//# sourceMappingURL=language.decorator.js.map