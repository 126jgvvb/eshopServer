import { PaymentService } from '../payments-service/payment.service';
export declare class PaymentsController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    captureFundsAuthorizedThroughAnotherChannel(cardDetails: object, invoice: string, description: string, authCode: number, amount: number): any;
}
