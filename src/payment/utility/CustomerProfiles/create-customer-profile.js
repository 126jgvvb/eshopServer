'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');
var constants = require('../constants.js');

function createCustomerProfile(customerObj,callback) {

	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	console.log('customer body:'+constants.transactionKey);

	var creditCard = new ApiContracts.CreditCardType();
	creditCard.setCardNumber(customerObj.cardNo);
	creditCard.setExpirationDate(customerObj.expiryDate);

	var paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCard);
	
	var customerAddress = new ApiContracts.CustomerAddressType();
	customerAddress.setFirstName(customerObj.firstName);
	customerAddress.setLastName(customerObj.lastName);
	customerAddress.setAddress(customerObj.Address);
	customerAddress.setCity(customerObj.city);
	customerAddress.setState(customerObj.state);
	customerAddress.setZip(customerObj.zip);
	customerAddress.setCountry(customerObj.country);
	customerAddress.setPhoneNumber(customerObj.phoneNumber);

	var customerPaymentProfileType = new ApiContracts.CustomerPaymentProfileType();
	customerPaymentProfileType.setCustomerType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);
	customerPaymentProfileType.setPayment(paymentType);
	customerPaymentProfileType.setBillTo(customerAddress);

	var paymentProfilesList = [];
	paymentProfilesList.push(customerPaymentProfileType);

	var customerProfileType = new ApiContracts.CustomerProfileType();
	customerProfileType.setMerchantCustomerId(customerObj.merchantID);
	customerProfileType.setDescription(customerObj.description);
	customerProfileType.setEmail(customerObj.email);
	customerProfileType.setPaymentProfiles(paymentProfilesList);

	var createRequest = new ApiContracts.CreateCustomerProfileRequest();
	createRequest.setProfile(customerProfileType);
	createRequest.setValidationMode(ApiContracts.ValidationModeEnum.TESTMODE);
	createRequest.setMerchantAuthentication(merchantAuthenticationType);

	//pretty print request
	//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
	
	var ctrl = new ApiControllers.CreateCustomerProfileController(createRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.CreateCustomerProfileResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('Successfully created a customer profile with id: ' + response.getCustomerProfileId());
			}
			else
			{
				console.log('Result Code: ' + response.getMessages().getResultCode());
				console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
				console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
			}
		}
		else
		{
			console.log('Null response received');
		}

		callback(response);
	});
}

/*
if (require.main === module) {
	createCustomerProfile(function(){
		console.log('createCustomerProfile call complete.');
	});
}*/

module.exports.createCustomerProfile = createCustomerProfile;
