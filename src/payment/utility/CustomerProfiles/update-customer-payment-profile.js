'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var constants = require('../constants.js');

function updateCustomerPaymentProfile(customerObj,customerPaymentProfileId, callback) {

	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	var creditCardForUpdate = new ApiContracts.CreditCardType();
	creditCardForUpdate.setCardNumber(customerObj.cardNo);
	creditCardForUpdate.setExpirationDate(customerObj.expiryDate);

	var paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCardForUpdate);

	var customerAddressType = new ApiContracts.CustomerAddressType();
	customerAddressType.setFirstName(customerObj.firstName);
	customerAddressType.setLastName(customerObj.lastName);
	customerAddressType.setAddress(customerObj.Address);
	customerAddressType.setCity(customerObj.city);
	customerAddressType.setState(customerObj.state);
	customerAddressType.setZip(customerObj.zip);
	customerAddressType.setCountry(customerObj.country);
	customerAddressType.setPhoneNumber(customerObj.phoneNumber);

	var customerForUpdate = new ApiContracts.CustomerPaymentProfileExType();
	customerForUpdate.setPayment(paymentType);
	//customerForUpdate.setDefaultPaymentProfile(true);

	customerForUpdate.setCustomerPaymentProfileId(customerPaymentProfileId);
	customerForUpdate.setBillTo(customerAddressType);

	var updateRequest = new ApiContracts.UpdateCustomerPaymentProfileRequest();
	updateRequest.setMerchantAuthentication(merchantAuthenticationType);
	updateRequest.setCustomerProfileId(customerObj.ProfileID);	
	updateRequest.setPaymentProfile(customerForUpdate);
	updateRequest.setValidationMode(ApiContracts.ValidationModeEnum.LIVEMODE);

	//pretty print request
	console.log(JSON.stringify(updateRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.UpdateCustomerPaymentProfileController(updateRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.UpdateCustomerPaymentProfileResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('Successfully updated a customer payment profile with id: ' + customerPaymentProfileId);
			}
			else
			{
				//console.log('Result Code: ' + response.getMessages().getResultCode());
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
	updateCustomerPaymentProfile('1929176981', '1841409255', function(){
		console.log('updateCustomerPaymentProfile call complete.');
	});
}*/

module.exports.updateCustomerPaymentProfile = updateCustomerPaymentProfile;