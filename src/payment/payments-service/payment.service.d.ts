export declare class PaymentService {
    captureFundsAuthorizedThroughAnotherChannel(cardDetails: object, invoice: string, description: string, authCode: number, amount: number): void;
    authorizeCreditCard(ID: string, customerObj: object, callback: any): void;
    capturePreviouslyAuthorizedAmount(customerObj: object, callback: any): void;
    chargeCreditCard(customerObj: object, callback: any): void;
    chargeCustomerProfile(customerObj: object, callback: any): void;
    chargeTokenizedCreditCard(customerObj: object, callback: any): void;
    createChasePayTransaction(customerObj: object, callback: any): void;
    creditBankAccount(customerObj: object, callback: any): void;
    debitBankAccount(customerObj: object, callback: any): void;
}
