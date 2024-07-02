/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');
var constants = require('../constants.js');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function authorizeCreditCard(customerObj,callback) {
	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	var creditCard = new ApiContracts.CreditCardType();
	creditCard.setCardNumber(customerObj.cardDetails.cardNumber);  //'4242424242424242'
	creditCard.setExpirationDate(customerObj.cardDetails.expiryDate);   //'0835'
	creditCard.setCardCode(customerObj.cardDetails.cardCode);

	var paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCard);

	var orderDetails = new ApiContracts.OrderType();
	orderDetails.setInvoiceNumber(customerObj.orderDetails.invoice);    //'INV-12345'
	orderDetails.setDescription(customerObj.orderDetails.description);

	var tax = new ApiContracts.ExtendedAmountType();
	tax.setAmount(customerObj.taxDetails.amount);  //double
	tax.setName(customerObj.taxDetails.name); //tax name
	tax.setDescription(customerObj.taxDetails.description);

	var duty = new ApiContracts.ExtendedAmountType();
	duty.setAmount(customerObj.dutyDetails.amount);  //details
	duty.setName(customerObj.dutyDetails.name);
	duty.setDescription(customerObj.dutyDetails.description);

	var shipping = new ApiContracts.ExtendedAmountType();
	shipping.setAmount(customerObj.shippingDetails.amount);
	shipping.setName(customerObj.shippingDetails.name);
	shipping.setDescription(customerObj.shippingDetails.description);

	var billTo = new ApiContracts.CustomerAddressType();
	billTo.setFirstName(customerObj.billTo.firstName);
	billTo.setLastName(customerObj.billTo.lastName);
	billTo.setCompany(customerObj.billTo.company);
	billTo.setAddress(customerObj.billTo.address);
	billTo.setCity(customerObj.billTo.city);
	billTo.setState(customerObj.billTo.state);
	billTo.setZip(customerObj.billTo.zip);
	billTo.setCountry(customerObj.billTo.country);

	var shipTo = new ApiContracts.CustomerAddressType();
	shipTo.setFirstName(customerObj.shipTo.firstName);
	shipTo.setLastName(customerObj.shipTo.lastName);
	shipTo.setCompany(customerObj.shipTo.company);
	shipTo.setAddress(customerObj.shipTo.address);
	shipTo.setCity(customerObj.shipTo.city);
	shipTo.setState(customerObj.shipTo.state);
	shipTo.setZip(customerObj.shipTo.zip);
	shipTo.setCountry(customerObj.shipTo.country);

	
	//var lineItem_id1 = new ApiContracts.LineItemType();
	var lineItem = new ApiContracts.LineItemType();
	/*lineItem_id1.setItemId('1');
	lineItem_id1.setName('vase');
	lineItem_id1.setDescription('cannes logo');
	lineItem_id1.setQuantity('18');
	lineItem_id1.setUnitPrice(45.00);

	var lineItem_id2 = new ApiContracts.LineItemType();
	lineItem_id2.setItemId('2');
	lineItem_id2.setName('vase2');
	lineItem_id2.setDescription('cannes logo2');
	lineItem_id2.setQuantity('28');
	lineItem_id2.setUnitPrice('25.00');
*/
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



	var userField= new ApiContracts.UserField();
//	userField_a.setName('A');
//	userField_a.setValue('Aval');


//	var userField_b = new ApiContracts.UserField();
//	userField_b.setName('B');
//	userField_b.setValue('Bval');

	var userFieldList = [];
//	userFieldList.push(userField_a);
//	userFieldList.push(userField_b);

	
	for(let item of customerObj.userFields){
	userField.setName(item.name);
	userField.setValue(item.value);
	userFieldList.push(userField);
	}

	var userFields = new ApiContracts.TransactionRequestType.UserFields();
	userFields.setUserField(userFieldList);

	var transactionSetting = new ApiContracts.SettingType();
//	transactionSetting1.setSettingName('duplicateWindow');
//	transactionSetting1.setSettingValue('120');

	//var transactionSetting2 = new ApiContracts.SettingType();
	//transactionSetting2.setSettingName('recurringBilling');
	//transactionSetting2.setSettingValue('false');

	var transactionSettingList = [];
	//transactionSettingList.push(transactionSetting1);
	//transactionSettingList.push(transactionSetting2);
	
	for(let item of customerObj.transactionSettings){
	transactionSetting.setSettingName(item.name);
	transactionSetting.setSettingValue(item.value);
	transactionSettingList.push(transactionSetting);
	}

	var transactionSettings = new ApiContracts.ArrayOfSetting();
	transactionSettings.setSetting(transactionSettingList);

	var transactionRequestType = new ApiContracts.TransactionRequestType();
	transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
	transactionRequestType.setPayment(paymentType);
	transactionRequestType.setAmount(utils.getRandomAmount()); //change here
	transactionRequestType.setLineItems(lineItems);
	transactionRequestType.setUserFields(userFields);
	transactionRequestType.setOrder(orderDetails);
	transactionRequestType.setTax(tax);
	transactionRequestType.setDuty(duty);
	transactionRequestType.setShipping(shipping);
	transactionRequestType.setBillTo(billTo);
	transactionRequestType.setShipTo(shipTo);
	transactionRequestType.setTransactionSettings(transactionSettings);

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
				console.log('Failed Transaction.');
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
	authorizeCreditCard(function(){
		console.log('authorizeCreditCard call complete.');
	});
}*/

module.exports.authorizeCreditCard = authorizeCreditCard;