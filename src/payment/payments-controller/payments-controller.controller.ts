/* eslint-disable prettier/prettier */
import {Controller,Body,Post,Get,Delete} from '@nestjs/common';
import { PaymentService } from '../payments-service/payment.service'; 

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentService:PaymentService){}

  @Post('/capture-funds-authorized-through-channel')
captureFundsAuthorizedThroughAnotherChannel(
  @Body('cardDetails') cardDetails:object,
  @Body('invoice') invoice:string,
  @Body('description') description:string,
  @Body('authCode') authCode:number,
  @Body('amount') amount:number,
):any{

return  this.paymentService.captureFundsAuthorizedThroughAnotherChannel(cardDetails,invoice,description,authCode,amount);
   // return Res.status(HttpStatus.OK).json({message:"done",result:"done"});
}

@Post('/authorize-credit-card')
authorizeCreditCard(@Body('customerObj') customerObj:object):any{
  this.paymentService.authorizeCreditCard(customerObj,()=>{console.log("processing done...")})
}

@Post('/capture-previously-authorized-amount')
  capturePreviouslyAuthorizedAmount(@Body('customerObj') customerObj:object):any{
    this.paymentService.capturePreviouslyAuthorizedAmount(customerObj,()=>{console.log('processing done...')})
  }


@Post('/charge-credit-card')
chargeCreditCard(@Body('customerObj') customerObj:object):any{
  this.paymentService.chargeCreditCard(customerObj,()=>{console.log('processing done')})
}

@Post('/charge-custom-profile')
chargeCustomProfile(@Body('customerObj') customerObj:object):any{
  this.paymentService.chargeCustomerProfile(customerObj,()=>{console.log('processing done...')})
}


@Post('/charge-tokenized-credit-card')
chargeTokenizedCreditCard(@Body('customerObj') customerObj:object):any{
this.paymentService.chargeTokenizedCreditCard(customerObj,()=>{console.log('processing done...')})
}


@Post('/create-chase-pay-transaction')
  createChasePayTransaction(@Body('customerObj') customereObj:object):any{
    this.paymentService.createChasePayTransaction(customereObj,()=>{console.log('processing done...')})
  }

  @Post('/credit-bank-account')
  creditBankAccount(@Body('customerObj') customerObj:object):any{
    return this.paymentService.creditBankAccount(customerObj,()=>{console.log('processing done...')})
  } 


  @Post('/debit-bank-account')
  debitBankAcccount(@Body('customerObj') customerObj:object):any{
    return this.paymentService.debitBankAccount(customerObj,()=>{console.log('processing done...')})
  }


@Post('/void-transaction')
voidTransaction(@Body('customerObj') customerObj:object):any{
  return this.paymentService.voidTransaction(customerObj,()=>{console.log('processing done')})
}


@Post('/update-split-tender-group')
updateSplitTenderGroup(@Body('ID') ID:string):any{
  return this.paymentService.updateSplitTenderGroup(ID,()=>{console.log('procesing done')})
}


@Post('/create-subscription-from-customer-profle')
createSubscriptionFromCustomerProfile(@Body('ID') ID:string):any{
  return this.paymentService.createSubscriptionFromCustomerProfile(ID,()=>{console.log('processing done')})
}

@Post('/cancel-subscription')
cancelSubscription():any{
  return this.paymentService.cancelSubscription();
}



@Post('/create-subscription')
createSubscription():any{
  return this.paymentService.createSubscription();
}


@Post('/list-of-subscriptions')
GetListOfSubscriptions():any{
  return this.paymentService.getListOfSubscriptions();
}

@Post('/subscription-status')
getSubscriptionStatus(@Body('ID') ID:string):any{
  return this.paymentService.getSubscriptionStatus(ID);
}


@Post('/subscription')
getSubscription(@Body('ID') ID:string):any{
  return this.paymentService.getSubscription(ID);
}


@Post('/update-subscription')
updateSubscription(@Body('ID') ID:string):any{
  return this.paymentService.updateSubscription(ID);
}

@Get('/batch-statistics')
getBatchStats(@Body('ID') ID:string):any{
  return this.paymentService.getBatchStatistics(ID);
}


@Get('/settled-batch')
getSettledBatch():any{
  return this.paymentService.getSettledBatchList();
}


@Get('/transaction-details')
getTransactionDetails(@Body('ID') ID:string):any{
  return this.paymentService.getTransactionDetails(ID);
}


@Get('/transaction-list')
getTransactionList(@Body('ID') ID:string):any{
  return this.paymentService.getTransactionList(ID);
}


@Get('/transaction-list-for-customer')
getTxnForCustomer(@Body('ID') ID:string):any{
  return this.paymentService.getTransactionListForCustomer(ID);
}

@Get('/unsettled-transaction-list')
getUnsettledTransactionList():any{
  this.paymentService.getUnsettledTransactionList();
}

@Post('/create-visa-src-transaction')
createVisaSrcTransaction():any{
  this.paymentService.createVisaSrcTransaction();
}

@Post("/decrypt-visa-data")
decryptVisaSrcData():any{
  this.paymentService.decryptVisaSrcData();
}

@Post("/authorize-only")
authorizationOnly(){
  this.paymentService.authorizationOnly();
}

@Post('/authorize-and-capture')
authorizationAndCapture(){
  this.paymentService.authorizationAndCapture();
}

@Post('/autorize-only-continued')
authorizationOnlyContinued(ID:string):any{
    this.paymentService.authorizationOnlyContinued(ID);
}


@Post('/authorize-and-capture-continued')
authorizationAndCaptureContinued(ID:string){
    this.paymentService.authorizationAndCaptureContinued(ID);
}


@Post("/prior-auth-capture")
priorAuthorizationCapture(ID:string){
    this.paymentService.priorAuthorizationCapture(ID);
}

@Post('/paypal-void')
paypalVoid(ID:string){
    this.paymentService.paypalVoid(ID);
}

@Get('/details')
getDetails(ID:string){
    this.paymentService.getDetails(ID);
}

@Post('/credit')
credit(ID:string){
    this.paymentService.credit(ID);
}

@Post('/create-customer-profile')
createCustomerProfile(customObj:object){
return  this.paymentService.createCustomerProfile(customObj);
}

@Post('/create-customer-payment-profile')
createCustomerPaymentProfile(customerObj:object){
  this.paymentService.createCustomerPaymentProfile(customerObj);
}


@Post('/create-profile-from-transaction')
createCustomerProfileFromTransaction(customerObj:object,transaction_id:string){
  this.paymentService.createCustomerProfileFromTransaction(customerObj,transaction_id);
}

@Get('/customer-profile')
getCustomerProfile(ID:string){
  this.paymentService.getCustomerProfile(ID);
}

@Get('/payment-profile')
getCustomerPaymentProfile(ID:string,paymentID:string){
  return this.paymentService.getCustomerPaymentProfile(ID,paymentID);
}

@Get('/payment-profile-list')
getCustomerPaymentProfileList(){
  return this.paymentService.getCustomerPaymentProfileList();
}

@Post('/create-shipping-address')
createCustomerShippingAddress(customerObj){
  return this.paymentService.createCustomerShippingAddress(customerObj);
}


@Delete('/delete-payment-profile')
deleteCustomerPaymentProfile(ID:string,paymentID:string){
  return this.paymentService.deleteCustomerPaymentProfile(ID,paymentID);
}

@Delete('/delete-profile')
deleteCustomerProfile(ID:string){
  this.paymentService.deleteCustomerProfile(ID);
}


@Delete('/delete-shipping-address')
deleteCustomerShippingAddress(ID:string,AddressID:string){
  return this.paymentService.deleteCustomerShippingAddress(ID,AddressID);
}


@Get('/customer-profile-ids')
getCustomerProfileIds(){
  return this.paymentService.getCustomerProfileIds();
}

@Get('/shipping-address')
getCustomerShippingAddress(customerObj:string){
  return this.paymentService.getCustomerShippingAddress(customerObj);
}


@Get('/hosted-profile-page')
getHostedProfilePage(ID:string){
  return this.paymentService.getHostedProfilePage(ID);
}

@Post('/update-customer-payment-profile')
updateCustomerPaymentProfile(ID:string,paymentID:string){
  return this.paymentService.updateCustomerPaymentProfile(ID, paymentID);
}

@Post('/update-customer-profile')
updateCustomerProfile(customerObj:object){
  return this.paymentService.updateCustomerProfile(customerObj);
}

@Post('/update-customer-shipping-address')
updateCustomerShippingAddress(customerObj:string,ID:string,AddressID:string){
  return this.paymentService.updateCustomerShippingAddress(customerObj,ID,AddressID);
 
}

@Post('/validate-customer-profile')
validateCustomerPaymentProfile(ID:string,paymentID:string,cardCode:string){
  return this.paymentService.validateCustomerPaymentProfile(ID,paymentID,cardCode);
}






}

