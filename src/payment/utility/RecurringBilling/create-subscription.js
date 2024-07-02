'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');
var constants = require('../constants.js');

function createSubscription(customerObj,callback) {
	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	var interval = new ApiContracts.PaymentScheduleType.Interval();
	interval.setLength(1);
	interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);

	var paymentScheduleType = new ApiContracts.PaymentScheduleType();
	paymentScheduleType.setInterval(interval);
	paymentScheduleType.setStartDate(utils.getDate());
	paymentScheduleType.setTotalOccurrences(5);
	paymentScheduleType.setTrialOccurrences(0);

	var creditCard = new ApiContracts.CreditCardType();
	creditCard.setExpirationDate(customerObj.expiryDate);
	creditCard.setCardNumber(customerObj.cardNo);

	var payment = new ApiContracts.PaymentType();
	payment.setCreditCard(creditCard);

	var orderType = new ApiContracts.OrderType();
	orderType.setInvoiceNumber(customerObj.invoice); 
	orderType.setDescription(customerObj.description);

	var customer = new ApiContracts.CustomerType();
	customer.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
	customer.setId(customerObj.ID);
	customer.setEmail(customerObj.email);
	customer.setPhoneNumber(customerObj.phoneNumber);
	//customer.setFaxNumber(customerObj.);
	customer.setTaxId(customerObj.taxID);

	var nameAndAddressType = new ApiContracts.NameAndAddressType();
	nameAndAddressType.setFirstName(customerObj.nameAndAddress.firstName);
	nameAndAddressType.setLastName(customerObj.nameAndAddress.lastName);
	nameAndAddressType.setCompany(customerObj.nameAndAddress.company);
	nameAndAddressType.setAddress(customerObj.nameAndAddress.address);
	nameAndAddressType.setCity(customerObj.nameAndAddress.city);
	nameAndAddressType.setState(customerObj.nameAndAddress.state);
	nameAndAddressType.setZip(customerObj.nameAndAddress.zip);
	nameAndAddressType.setCountry(customerObj.nameAndAddress.country);

	var arbSubscription = new ApiContracts.ARBSubscriptionType();
	arbSubscription.setName(customerObj.arbSubscription.name);
	arbSubscription.setPaymentSchedule(paymentScheduleType);
	arbSubscription.setAmount(customerObj.arbSubscription.amount);
	arbSubscription.setTrialAmount(customerObj.arbSubscription.trialTime);
	arbSubscription.setPayment(payment);
	arbSubscription.setOrder(orderType);
	arbSubscription.setCustomer(customer);
	arbSubscription.setBillTo(nameAndAddressType);
	arbSubscription.setShipTo(nameAndAddressType);

	var createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
	createRequest.setMerchantAuthentication(merchantAuthenticationType);
	createRequest.setSubscription(arbSubscription);

	console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.ARBCreateSubscriptionController(createRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.ARBCreateSubscriptionResponse(apiResponse);

		console.log(JSON.stringify(response, null, 2));

		if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
				console.log('Subscription Id : ' + response.getSubscriptionId());
				console.log('Message Code : ' + response.getMessages().getMessage()[0].getCode());
				console.log('Message Text : ' + response.getMessages().getMessage()[0].getText());
			}
			else{
				console.log('Result Code: ' + response.getMessages().getResultCode());
				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
			}
		}
		else{
			console.log('Null Response.');
		}



		callback(response);
	});
}

if (require.main === module) {
	createSubscription(function(){
		console.log('createSubscription call complete.');
	});
}

module.exports.createSubscription = createSubscription;