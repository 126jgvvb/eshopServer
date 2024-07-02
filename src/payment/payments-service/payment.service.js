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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const test_runner_js_1 = __importDefault(require("../utility/test-runner.js"));
let PaymentService = class PaymentService {
    captureFundsAuthorizedThroughAnotherChannel(cardDetails, invoice, description, authCode, amount) {
        const txnObj = {
            cardDetails: cardDetails,
            invoice: invoice,
            description: description,
            authCode: authCode,
            amount: amount,
        };
        test_runner_js_1.default.captureFundsAuthorizedThroughAnotherChannel(txnObj, (response) => {
            console.log('-------------processing has ended---------------');
            return { message: response };
        });
    }
    authorizeCreditCard(ID, customerObj, callback) {
        test_runner_js_1.default.authorizeCreditCard(ID, customerObj, callback);
    }
    capturePreviouslyAuthorizedAmount(customerObj, callback) {
        test_runner_js_1.default.capturePreviouslyAuthorizedAmount(customerObj, callback);
    }
    chargeCreditCard(customerObj, callback) {
        test_runner_js_1.default.chargeCreditCard(customerObj, callback);
    }
    chargeCustomerProfile(customerObj, callback) {
        test_runner_js_1.default.chargeCustomerProfile(customerObj, callback);
    }
    chargeTokenizedCreditCard(customerObj, callback) {
        test_runner_js_1.default.chargeTokenizedCreditCard(customerObj, callback);
    }
    createChasePayTransaction(customerObj, callback) {
        test_runner_js_1.default.createChasePayTransaction(customerObj, callback);
    }
    creditBankAccount(customerObj, callback) {
        test_runner_js_1.default.creditBankAccount(customerObj, callback);
    }
    debitBankAccount(customerObj, callback) {
        test_runner_js_1.default.debitBankAccount(customerObj, callback);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
//# sourceMappingURL=payment.service.js.map