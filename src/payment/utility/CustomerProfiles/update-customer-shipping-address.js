'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var constants = require('../constants.js');

function updateCustomerShippingAddress(customerObj,customerProfileId, customerAddressId, callback) {

	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	var creditCardForUpdate = new ApiContracts.CreditCardType();
	creditCardForUpdate.setCardNumber(customerObj.cardNo);
	creditCardForUpdate.setExpirationDate(customerObj.expiryDate);

	var paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCardForUpdate);

	var customerShippingAddressForUpdate = new ApiContracts.CustomerAddressExType();
	customerShippingAddressForUpdate.setFirstName(customerObj.firstName);
	customerShippingAddressForUpdate.setLastName(customerObj.lasttName);
	customerShippingAddressForUpdate.setAddress(customerObj.Address);
	customerShippingAddressForUpdate.setCity(customerObj.city);
	customerShippingAddressForUpdate.setState(customerObj.state);
	customerShippingAddressForUpdate.setZip(customerObj.zip);
	customerShippingAddressForUpdate.setCountry(customerObj.country);
	customerShippingAddressForUpdate.setPhoneNumber(customerObj.phoneNumber);
	customerShippingAddressForUpdate.setCustomerAddressId(customerAddressId);

	var updateRequest = new ApiContracts.UpdateCustomerShippingAddressRequest();
	updateRequest.setMerchantAuthentication(merchantAuthenticationType);
	updateRequest.setCustomerProfileId(customerProfileId);	
	updateRequest.setAddress(customerShippingAddressForUpdate);

	//pretty print request
	//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.UpdateCustomerShippingAddressController(updateRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.UpdateCustomerShippingAddressResponse(apiResponse);

		//pretty print response
		//console.log(JSON.stringify(response, null, 2));

		if(response != null) 
		{
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK)
			{
				console.log('Successfully updated a customer shipping profile with id: ' + customerAddressId);
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
	updateCustomerShippingAddress('1929176981', '900520864', function(){
		console.log('updateCustomerShippingAddress call complete.');
	});
}*/

module.exports.updateCustomerShippingAddress = updateCustomerShippingAddress;