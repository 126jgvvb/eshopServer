"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('authorize', () => ({
    apiLoginId: process.env.AUTHORIZE_API_LOGIN_ID,
    transactionKey: process.env.AUTHORIZE_TRANSACTION_KEY,
    environment: process.env.AUTHORIZE_ENVIRONMENT
}));
//# sourceMappingURL=authorize.config.js.map