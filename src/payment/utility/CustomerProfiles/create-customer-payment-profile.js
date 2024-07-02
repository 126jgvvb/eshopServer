'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var constants = require('../constants.js');
var randomStreetNumber = Math.round(Math.random() * 1000)

function createCustomerPaymentProfile(customerObj, callback) {

	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

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
	customerAddress.setPhoneNumber(customerObj.country);

	var profile = new ApiContracts.CustomerPaymentProfileType();
	profile.setBillTo(customerAddress);
	profile.setPayment(paymentType);
	// profile.setDefaultPaymentProfile(true);

	var createRequest = new ApiContracts.CreateCustomerPaymentProfileRequest();

	createRequest.setMerchantAuthentication(merchantAuthenticationType);
	createRequest.setCustomerProfileId(customerObj.ID);
	createRequest.setPaymentProfile(profile);

	//pretty print request
	//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.CreateCustomerPaymentProfileController(createRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.CreateCustomerPaymentProfileResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('createCustomerPaymentProfile: Successfully created a customer payment profile with id: ' + response.getCustomerPaymentProfileId());
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
	createCustomerPaymentProfile('1929176981',function(){
		console.log('createCustomerPaymentProfile call complete.');
	});
}*/

module.exports.createCustomerPaymentProfile = createCustomerPaymentProfile;