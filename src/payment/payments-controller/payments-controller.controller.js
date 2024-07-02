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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../payments-service/payment.service");
let PaymentsController = class PaymentsController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    captureFundsAuthorizedThroughAnotherChannel(cardDetails, invoice, description, authCode, amount) {
        return this.paymentService.captureFundsAuthorizedThroughAnotherChannel(cardDetails, invoice, description, authCode, amount);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('/capture-funds-authorized-through-channel'),
    __param(0, (0, common_1.Body)('cardDetails')),
    __param(1, (0, common_1.Body)('invoice')),
    __param(2, (0, common_1.Body)('description')),
    __param(3, (0, common_1.Body)('authCode')),
    __param(4, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number, Number]),
    __metadata("design:returntype", Object)
], PaymentsController.prototype, "captureFundsAuthorizedThroughAnotherChannel", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments-controller'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentsController);
//# sourceMappingURL=payments-controller.controller.js.map