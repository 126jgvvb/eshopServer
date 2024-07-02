"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const payments_controller_controller_1 = require("./payment/payments-controller/payments-controller.controller");
const payment_service_1 = require("./payment/payments-service/payment.service");
const payments_module_1 = require("./payment/payments.module");
const config_1 = require("@nestjs/config");
const authorize_config_1 = __importDefault(require("./config/authorize.config"));
const authorizenet_1 = require("../node_modules/authorizenet/lib/authorizenet.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [payments_module_1.PaymentModule, config_1.ConfigModule.forRoot({ isGlobal: true, load: [authorize_config_1.default] }), authorizenet_1.authorizeModule],
        controllers: [app_controller_1.AppController, payments_controller_controller_1.PaymentsController],
        providers: [app_service_1.AppService, payment_service_1.PaymentService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map