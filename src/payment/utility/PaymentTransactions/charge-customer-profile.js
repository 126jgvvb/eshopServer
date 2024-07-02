'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');
var constants = require('../constants.js');

function chargeCustomerProfile(customerObj,callback) {
	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	var profileToCharge = new ApiContracts.CustomerProfilePaymentType();
	profileToCharge.setCustomerProfileId(customerObj);

	var paymentProfile = new ApiContracts.PaymentProfile();
	paymentProfile.setPaymentProfileId(customerObj);
	profileToCharge.setPaymentProfile(paymentProfile);

	var orderDetails = new ApiContracts.OrderType();
	orderDetails.setInvoiceNumber(customerObj);
	orderDetails.setDescription(customerObj);

	var lineItem= new ApiContracts.LineItemType();

	var lineItemList = [];
	//lineItemList.push(lineItem_id1);
	//lineItemList.push(lineItem_id2);

	for(let item of customerObj.items){
		lineItem.setItemId(item.id);
		lineItem.setName(item.name);
		lineItem.setDescription(item.description);
		lineItem.setQuantity(item.quantity);
		lineItem.setUnitPrice(item.price);
		lineItemList.push(lineItem);
	}

	var lineItems = new ApiContracts.ArrayOfLineItem();
	lineItems.setLineItem(lineItemList);

	var shipTo = new ApiContracts.CustomerAddressType();
	shipTo.setFirstName(customerObj.shipTo.firstName);
	shipTo.setLastName(customerObj.shipTo.lastName);
	shipTo.setCompany(customerObj.shipTo.company);
	shipTo.setAddress(customerObj.shipTo.address);
	shipTo.setCity(customerObj.shipTo.city);
	shipTo.setState(customerObj.shipTo.state);
	shipTo.setZip(customerObj.shipTo.zip);
	shipTo.setCountry(customerObj.shipTo.country);

	var transactionRequestType = new ApiContracts.TransactionRequestType();
	transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
	transactionRequestType.setProfile(profileToCharge);
	transactionRequestType.setAmount(utils.getRandomAmount());
	transactionRequestType.setLineItems(lineItems);
	transactionRequestType.setOrder(orderDetails);
	transactionRequestType.setShipTo(shipTo);

	var createRequest = new ApiContracts.CreateTransactionRequest();
	createRequest.setMerchantAuthentication(merchantAuthenticationType);
	createRequest.setTransactionRequest(transactionRequestType);

	//pretty print request
	console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

	ctrl.execute(function(){

		var apiResponse = ctrl.getResponse();

		var response = new ApiContracts.CreateTransactionResponse(apiResponse);

		//pretty print response
		console.log(JSON.stringify(response, null, 2));

		if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
				if(response.getTransactionResponse().getMessages() != null){
					console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
					console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
					console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
					console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
				}
				else {
					console.log('Failed Transaction.');
					if(response.getTransactionResponse().getErrors() != null){
						console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
						console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
					}
				}
			}
			else {
				console.log('Failed Transaction. ');
				if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
				
					console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
					console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
				}
				else {
					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
				}
			}
		}
		else {
			console.log('Null Response.');
		}

		callback(response);
	});
}

/*
if (require.main === module) {
	chargeCustomerProfile('111111', '222222', function(){
		console.log('chargeCustomerProfile call complete.');
	});
}
*/

module.exports.chargeCustomerProfile = chargeCustomerProfile;