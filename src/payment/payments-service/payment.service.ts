/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
//import {AuthAPI}  from '/Users/SAVANA/eshop-server/src/utils/APIs/paymentAPI'
import AuthAPI from '../utility/test-runner.js';
  
@Injectable()
export class 
PaymentService {
  captureFundsAuthorizedThroughAnotherChannel(
    cardDetails: object,
    invoice: string,
    description: string,
    authCode: number,
    amount: number,
    
  ) {
    const txnObj = {
      cardDetails: cardDetails,
      invoice: invoice,
      description: description,
      authCode: authCode,
      amount: amount,
    };

    AuthAPI.captureFundsAuthorizedThroughAnotherChannel(txnObj, (response) => {
      console.log('-------------processing has ended---------------');
      return { message: response };
    });
  }

  authorizeCreditCard(customerObj: object, callback: any) {
    AuthAPI.authorizeCreditCard(customerObj, callback);
  }


  capturePreviouslyAuthorizedAmount(customerObj:object,callback:any){
    AuthAPI.capturePreviouslyAuthorizedAmount(customerObj,callback);
  }


  chargeCreditCard(customerObj:object,callback:any){
    AuthAPI.chargeCreditCard(customerObj,callback);
  }


  chargeCustomerProfile(customerObj:object,callback:any){
    AuthAPI.chargeCustomerProfile(customerObj,callback);
  }


  chargeTokenizedCreditCard(customerObj:object,callback:any){
    AuthAPI.chargeTokenizedCreditCard(customerObj,callback);
  }


  createChasePayTransaction(customerObj:object,callback:any){
    AuthAPI.createChasePayTransaction(customerObj,callback);
  }


  creditBankAccount(customerObj:object,callback:any){
    AuthAPI.creditBankAccount(customerObj,callback);
  }


  debitBankAccount(customerObj:object,callback:any){
    AuthAPI.debitBankAccount(customerObj,callback);
  }

  voidTransaction(customereObj:object,callback:any){
    AuthAPI.voidTransaction(customereObj,callback);
  }

  updateSplitTenderGroup(ID:string,callback:any){
    AuthAPI.updateSplitTenderGroup(ID,callback);
  }


createSubscriptionFromCustomerProfile(ID:string,callback:any){
AuthAPI.createSubscriptionFromCustomerProfile(ID,callback);
}

cancelSubscription(){
  AuthAPI.cancelSubscription(()=>{console.log('processing done')})
}


createSubscription(){
  AuthAPI.createSubscription(()=>{console.log('processing done')})
}


getListOfSubscriptions(){
  AuthAPI.getListOfSubscriptions(()=>{console.log('processing done')})
}

getSubscriptionStatus(ID:string){
  AuthAPI.getSubscriptionStatus(ID,()=>{console.log('processing done')})
}

getSubscription(ID:string){
  AuthAPI.getSubscription(ID,()=>{console.log('processing done')})
}

updateSubscription(ID:string){
  AuthAPI.updateSubscription(ID,()=>{console.log('processing done')})
}


getBatchStatistics(ID:string){
  AuthAPI.getBatchStatistics(ID,()=>{console.log('processing done')});
}


getSettledBatchList(){
  AuthAPI.getSettledBatchList(()=>{console.log('processing done')});
}


getTransactionDetails(ID:string){
    AuthAPI.getTransactionDetails(ID,()=>{console.log('processing done')});
}



getTransactionList(ID:string){
  AuthAPI.getTransactionList(ID,()=>{console.log('procesing done')});
}

getTransactionListForCustomer(ID:string){
  AuthAPI.getTransactionListForCustomer(ID,()=>{console.log('procesing done')});  
}

getUnsettledTransactionList(){
  AuthAPI.getUnsettledTransactionList(()=>{console.log('procesing done')});
}

createVisaSrcTransaction(){
  AuthAPI.createVisaSrcTransaction(()=>{console.log('procesing done')});
}

decryptVisaSrcData(){
  AuthAPI.decryptVisaSrcData(()=>{console.log('procesing done')});
}

authorizationOnly(){
  AuthAPI.authorizationOnly(()=>{console.log('processing done')});
}

authorizationAndCapture(){
  AuthAPI.authorizationAndCapture(()=>{console.log('processing done')});
}

authorizationOnlyContinued(ID:string){
    AuthAPI.authorizationOnlyContinued(ID, ()=>{console.log('processing done')});
}

authorizationAndCaptureContinued(ID:string){
    AuthAPI.authorizationAndCaptureContinued(ID,()=>{console.log('processing done')});
}

priorAuthorizationCapture(ID:string){
    AuthAPI.priorAuthorizationCapture(ID,()=>{console.log('processing done')});
}

paypalVoid(ID:string){
    AuthAPI.paypalVoid(ID,()=>{console.log('processing done')});
}

getDetails(ID:string){
    AuthAPI.getDetails(ID,()=>{console.log('processing done')});
}

credit(ID:string){
    AuthAPI.credit(ID,()=>{console.log('processing done')});
}


createCustomerProfile(customObj:object){
  AuthAPI.createCustomerProfile(customObj,()=>{console.log('processing done')});
}

createCustomerPaymentProfile(customerObj:object){
  AuthAPI.createCustomerPaymentProfile(customerObj,()=>{console.log('processing done')});
}

createCustomerProfileFromTransaction(customerObj:object,transaction_id:string){
    AuthAPI.createCustomerProfileFromTransaction(customerObj,transaction_id,()=>{console.log('processing done')});
}

getCustomerProfile(ID:string){
  AuthAPI.getCustomerProfile(ID, ()=>{console.log('procesing done')});
}

getCustomerPaymentProfile(ID:string,paymentID:string){
  AuthAPI.getCustomerPaymentProfile(ID,paymentID,()=>{console.log('processing done')});
}

getCustomerPaymentProfileList(){
  AuthAPI.getCustomerPaymentProfileList(()=>{console.log('processing done')});
}

createCustomerShippingAddress(customerObj){
  AuthAPI.createCustomerShippingAddress(customerObj,()=>{console.log('processing done')});
}

deleteCustomerPaymentProfile(ID:string,paymentID:string){
  AuthAPI.deleteCustomerPaymentProfile(ID,paymentID,()=>{console.log('processing done')});
}

deleteCustomerProfile(ID:string){
  AuthAPI.deleteCustomerProfile(ID,()=>{console.log('processing done')});
}

deleteCustomerShippingAddress(ID:string,AddressID:string){
  AuthAPI.deleteCustomerShippingAddress(ID,AddressID,()=>{console.log('processing done')});
}

getCustomerProfileIds(){
  AuthAPI.getCustomerProfileIds(()=>{console.log('processing done')});
}

getCustomerShippingAddress(customerObj:string){
  AuthAPI.getCustomerShippingAddress(customerObj,()=>{console.log('processing done')});
}

getHostedProfilePage(ID:string){
  AuthAPI.getHostedProfilePage(ID, ()=>{console.log('processing done')});
}

updateCustomerPaymentProfile(ID:string,paymentID:string){
  AuthAPI.updateCustomerPaymentProfile(ID, paymentID,()=>{console.log('processing done')});
}

updateCustomerProfile(customerObj:object){
  AuthAPI.updateCustomerProfile(customerObj,()=>{console.log('processing done')});
}

updateCustomerShippingAddress(customerObj:string,ID:string,AddressID:string){
  AuthAPI.updateCustomerShippingAddress(customerObj,ID,AddressID,()=>{console.log('processing done')});
 
}

validateCustomerPaymentProfile(ID:string,paymentID:string,cardCode:string){
  AuthAPI.validateCustomerPaymentProfile(ID,paymentID,cardCode,()=>{console.log('processing done')});
}




}
