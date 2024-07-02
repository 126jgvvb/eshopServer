/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
//'use strict';

import { APIContracts as ApiContracts } from 'authorizenet';
//var assert = import('chai').assert;

import { createChasePay as _createChasePay, authorizeCreditCard as _authorizeCreditCard, chargeCreditCard as _chargeCreditCard, capturePreviouslyAuthorizedAmount as _capturePreviouslyAuthorizedAmount, captureFundsAuthorizedThroughAnotherChannel as _captureFundsAuthorizedThroughAnotherChannel, refundTransaction as _refundTransaction, voidTransaction as _voidTransaction, updateSplitTenderGroup as _updateSplitTenderGroup, debitBankAccount as _debitBankAccount, creditBankAccount as _creditBankAccount, chargeCustomerProfile as _chargeCustomerProfile, chargeTokenizedCreditCard as _chargeTokenizedCreditCard } from './PaymentTransactions/index';
import { createSubscription as _createSubscription, cancelSubscription as _cancelSubscription, createSubscriptionFromCustomerProfile as _createSubscriptionFromCustomerProfile, getListOfSubscriptions as _getListOfSubscriptions, getSubscriptionStatus as _getSubscriptionStatus, getSubscription as _getSubscription, updateSubscription as _updateSubscription } from './RecurringBilling/index';
import { getBatchStatistics as _getBatchStatistics, getSettledBatchList as _getSettledBatchList, getTransactionDetails as _getTransactionDetails, getTransactionList as _getTransactionList, getTransactionListForCustomer as _getTransactionListForCustomer, getUnsettledTransactionList as _getUnsettledTransactionList } from './TransactionReporting/index';
import { createVisaSrcTransaction as _createVisaSrcTransaction, decryptVisaSrcData as _decryptVisaSrcData } from './VisaCheckout/index';
import { authorizationOnly as _authorizationOnly, authorizationAndCapture as _authorizationAndCapture, authorizationOnlyContinued as _authorizationOnlyContinued, authorizationAndCaptureContinued as _authorizationAndCaptureContinued, priorAuthorizationCapture as _priorAuthorizationCapture, paypalVoid as _paypalVoid, getDetails as _getDetails, credit as _credit } from './PayPalExpressCheckout/index';
//var ApplePayTransactionsModule = require('./ApplePayTransactions');
import { createCustomerProfileWithAccept as _createCustomerProfileWithAccept, getCustomerProfile as _getCustomerProfile, createCustomerProfile as _createCustomerProfile, createCustomerPaymentProfile as _createCustomerPaymentProfile, createCustomerProfileFromTransaction as _createCustomerProfileFromTransaction, getCustomerPaymentProfile as _getCustomerPaymentProfile, getCustomerPaymentProfileList as _getCustomerPaymentProfileList, createCustomerShippingAddress as _createCustomerShippingAddress, deleteCustomerPaymentProfile as _deleteCustomerPaymentProfile, deleteCustomerProfile as _deleteCustomerProfile, deleteCustomerShippingAddress as _deleteCustomerShippingAddress, getCustomerProfileIds as _getCustomerProfileIds, getCustomerShippingAddress as _getCustomerShippingAddress, getHostedProfilePage as _getHostedProfilePage, updateCustomerPaymentProfile as _updateCustomerPaymentProfile, updateCustomerProfile as _updateCustomerProfile, updateCustomerShippingAddress as _updateCustomerShippingAddress, validateCustomerPaymentProfile as _validateCustomerPaymentProfile } from './CustomerProfiles/index';
var filterTestMethod = process.argv[2];

class TestRunner {

	validateResponse(response){
		if(response == null){
			return false;
		}

		if(response.getMessages().getResultCode() != ApiContracts.MessageTypeEnum.OK){
			return false;
		}

		return true;
	}

	createChasePay(obj,validateFunctionCallback){
		_createChasePay(obj,validateFunctionCallback);
	}


	createCustomerProfileWithAccept(customerObj,validateFunctionCallback){
		_createCustomerProfileWithAccept(customerObj,validateFunctionCallback);
	
	}



	authorizeCreditCard(validateFunctionCallback){
		_authorizeCreditCard(validateFunctionCallback);
	}

	chargeCreditCard(customerObj,validateFunctionCallback){
		_chargeCreditCard(customerObj,validateFunctionCallback);
	}

	capturePreviouslyAuthorizedAmount(ArrayOfItems,validateFunctionCallback){
		_capturePreviouslyAuthorizedAmount(ArrayOfItems,validateFunctionCallback);
		/*	PaymentTransactionsModule.authorizeCreditCard(function(response){
			PaymentTransactionsModule.capturePreviouslyAuthorizedAmount(response.getTransactionResponse().getTransId(), 
					validateFunctionCallback);
		});*/
	}

	captureFundsAuthorizedThroughAnotherChannel(ArrayOfItems,validateFunctionCallback){
		_captureFundsAuthorizedThroughAnotherChannel(ArrayOfItems,validateFunctionCallback);
	}

	refundTransaction(customerObj,validateFunctionCallback){
		_authorizeCreditCard(customerObj,function(response){
			_capturePreviouslyAuthorizedAmount(customerObj,response.getTransactionResponse().getTransId(),
				function(captureResponse){
					_refundTransaction(customerObj,captureResponse.getTransactionResponse().getTransId(), validateFunctionCallback);
				});
		});
	}

	voidTransaction(customerObj,validateFunctionCallback){
	//	_authorizeCreditCard(ID,customerObj,function(response){
		_voidTransaction(customerObj, validateFunctionCallback);
		//});
	}

	updateSplitTenderGroup(ID,validateFunctionCallback){
		_updateSplitTenderGroup(ID,validateFunctionCallback);
	}

	debitBankAccount(customerObj,validateFunctionCallback){
		_debitBankAccount(customerObj,validateFunctionCallback);
	}

	creditBankAccount(customerObj,validateFunctionCallback){
		_debitBankAccount(customerObj,function(response){
			_creditBankAccount(response.getTransactionResponse().getTransId(),customerObj, validateFunctionCallback);
		});
	}

	chargeCustomerProfile(ArrayOfItems,validateFunctionCallback){
		_chargeCustomerProfile(ArrayOfItems, validateFunctionCallback);
		/*	CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				PaymentTransactionsModule.chargeCustomerProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	*/}

	chargeTokenizedCreditCard(obj,validateFunctionCallback){
		_chargeTokenizedCreditCard(obj,validateFunctionCallback);
	}

	cancelSubscription(validateFunctionCallback){
		_createSubscription(function(response){
			_cancelSubscription(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	createSubscriptionFromCustomerProfile(ID,validateFunctionCallback){
		/* CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
					RecurringBillingModule.createSubscriptionFromCustomerProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
				});
			});
		}); */
		
		_getCustomerProfile(ID, function(profileResponse) {
			_createSubscriptionFromCustomerProfile(profileResponse.profile.customerProfileId, profileResponse.profile.paymentProfiles[0].customerPaymentProfileId, profileResponse.profile.shipToList[0].customerAddressId, validateFunctionCallback);
		});
		
	}

	createSubscription(validateFunctionCallback){
		_createSubscription(validateFunctionCallback);
	}

	getListOfSubscriptions(validateFunctionCallback){
		_getListOfSubscriptions(validateFunctionCallback);
	}

	getSubscriptionStatus(ID,validateFunctionCallback){
		//_createSubscription(function(response){
		_getSubscriptionStatus(ID, validateFunctionCallback);
	//	});
	}

	getSubscription(ID,validateFunctionCallback){
	//	_createSubscription(function(response){
		_getSubscription(ID, validateFunctionCallback);
	//	});
	}

	updateSubscription(ID,validateFunctionCallback){
		//_createSubscription(function(response){
		_updateSubscription(ID, validateFunctionCallback);
	//	});
	}

	getBatchStatistics(ID,validateFunctionCallback){
		_getBatchStatistics(ID, validateFunctionCallback);
	}

	getSettledBatchList(validateFunctionCallback){
		_getSettledBatchList(validateFunctionCallback);
	}

	getTransactionDetails(validateFunctionCallback){
		_authorizeCreditCard(function(response){
			_getTransactionDetails(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	getTransactionList(validateFunctionCallback){
		_getTransactionList('4594221', validateFunctionCallback);
	}
	
	getTransactionListForCustomer(validateFunctionCallback){
		_getTransactionListForCustomer('1811474252', validateFunctionCallback);
		
	}

	getUnsettledTransactionList(validateFunctionCallback){
		_getUnsettledTransactionList(validateFunctionCallback);
	}

	createVisaSrcTransaction(validateFunctionCallback){
		_createVisaSrcTransaction(validateFunctionCallback);
	}

	decryptVisaSrcData(validateFunctionCallback){
		_decryptVisaSrcData(validateFunctionCallback);
	}

	authorizationOnly(validateFunctionCallback){
		_authorizationOnly(validateFunctionCallback);
	}

	authorizationAndCapture(validateFunctionCallback){
		_authorizationAndCapture(validateFunctionCallback);
	}

	authorizationOnlyContinued(validateFunctionCallback){
		_authorizationOnly(function(response){
			_authorizationOnlyContinued(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	authorizationAndCaptureContinued(validateFunctionCallback){
		_authorizationAndCapture(function(response){
			_authorizationAndCaptureContinued(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	priorAuthorizationCapture(validateFunctionCallback){
		_authorizationAndCapture(function(response){
			_priorAuthorizationCapture(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	paypalVoid(validateFunctionCallback){
		_authorizationAndCapture(function(response){
			_paypalVoid(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	getDetails(validateFunctionCallback){
		_authorizationAndCapture(function(response){
			_getDetails(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	credit(validateFunctionCallback){
		_authorizationAndCapture(function(response){
			_credit(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}
	/*
	createApplePayTransaction(validateFunctionCallback){
		ApplePayTransactionsModule.createApplePayTransaction(validateFunctionCallback);
	}
*/
	createCustomerProfile(customObj,validateFunctionCallback){
		_createCustomerProfile(customObj,validateFunctionCallback);
	}

	createCustomerPaymentProfile(customerObj,validateFunctionCallback){
		_createCustomerPaymentProfile(customerObj, validateFunctionCallback);
		/*	CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});*/
	}

	createCustomerProfileFromTransaction(id,customerObj,transaction_id,validateFunctionCallback){
		_authorizeCreditCard(id,customerObj,()=>{
			console.log('card authorization successful');
			_createCustomerProfileFromTransaction(customerObj,transaction_id,validateFunctionCallback);
		});

		/*PaymentTransactionsModule.authorizeCreditCard(function(response){
			CustomerProfilesModule.createCustomerProfileFromTransaction(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});*/
	}

	getCustomerProfile(ID,validateFunctionCallback){
		_getCustomerProfile(ID, validateFunctionCallback);
		/*		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.getCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});*/
	}

	getCustomerPaymentProfile(ID,paymentID,validateFunctionCallback){
		_getCustomerPaymentProfile(ID,paymentID, validateFunctionCallback);
	
		/*	CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.getCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		}
	)*/
	}

	getCustomerPaymentProfileList(validateFunctionCallback){
		_getCustomerPaymentProfileList(validateFunctionCallback);
	}
	
	createCustomerShippingAddress(customerObj,validateFunctionCallback){
		_createCustomerShippingAddress(customerObj, validateFunctionCallback);
		/*		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), validateFunctionCallback);
		});*/
	}

	deleteCustomerPaymentProfile(ID,paymentID,validateFunctionCallback){
		_deleteCustomerPaymentProfile(ID,paymentID, validateFunctionCallback);
		/*CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.deleteCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});*/
	}

	deleteCustomerProfile(ID,validateFunctionCallback){
		_deleteCustomerProfile(ID, validateFunctionCallback);
		/*	CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.deleteCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});*/
	}

	deleteCustomerShippingAddress(ID,AddressID,validateFunctionCallback){
		_deleteCustomerShippingAddress(ID,AddressID,validateFunctionCallback);
	/*	CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.deleteCustomerShippingAddress(response.getCustomerProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});*/
	}

	getCustomerProfileIds(validateFunctionCallback){
		_getCustomerProfileIds(validateFunctionCallback);
	}

	getCustomerShippingAddress(ID,customerObj,validateFunctionCallback){
		_getCustomerShippingAddress(customerObj, validateFunctionCallback);
		/*	CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.getCustomerShippingAddress(response.getCustomerProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});*/
	}

	getHostedProfilePage(ID,validateFunctionCallback){
		_getHostedProfilePage(ID, validateFunctionCallback);
		/*	CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.getHostedProfilePage(response.getCustomerProfileId(), validateFunctionCallback);
		});*/
	}

	updateCustomerPaymentProfile(ID,paymentID,validateFunctionCallback){
		_updateCustomerPaymentProfile(ID, paymentID, validateFunctionCallback);
		/*
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.updateCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});*/
	}

	updateCustomerProfile(customerObj,validateFunctionCallback){
		_updateCustomerProfile(customerObj, validateFunctionCallback);
		/*CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.updateCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});*/
	}

	updateCustomerShippingAddress(customerObj,ID,AddressID,validateFunctionCallback){
		_updateCustomerShippingAddress(customerObj,ID,AddressID, validateFunctionCallback);
		/*
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.updateCustomerShippingAddress(response.getCustomerProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});*/
	}

	validateCustomerPaymentProfile(ID,paymentID,cardCode,validateFunctionCallback){
		_validateCustomerPaymentProfile(ID,paymentID,cardCode, validateFunctionCallback);
		/*	CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.validateCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	*/}

	callTestMethod(testMethodName, validateFunctionCallback){
		return this[testMethodName](validateFunctionCallback);
	}

	testAllSamples(){
		var lineReader = require('readline').createInterface({
			input: require('fs').createReadStream('./eshopPayment/list_of_sample_codes.txt')
		});

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		var testRunnerObject = this;

		lineReader.on('line', function (line) {
			var sample = line.split(',');
			var apiName = sample[0];
			var shouldApiRun = sample[1].trim()[0];

			if(shouldApiRun == '1'){
				if (filterTestMethod && apiName !== filterTestMethod) return console.log('\n************************ Running : ' + apiName + ' ************************\n');
				testRunnerObject.callTestMethod(apiName, function(response) {
					console.log('\n************************ Testing : ' + apiName + ' ************************\n'+response);
					//	assert.isTrue(testRunnerObject.validateResponse(response));
					/*
					if(!testRunnerObject.validateResponse(response)){
						console.log('Error in running ' + apiName + '. Stopped test runner.');
						return;
					}
					*/
				});
				
				console.log('\n************************ Ending : ' + apiName + ' ************************\n');
			}
		});
	}
}

export default new TestRunner();
