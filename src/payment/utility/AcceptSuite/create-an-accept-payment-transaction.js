'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;
var utils = require('../utils.js');
var constants = require('../constants.js');

function createAnAcceptPaymentTransaction(customerObj,callback) {
	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	var opaqueData = new ApiContracts.OpaqueDataType();
	opaqueData.setDataDescriptor('COMMON.ACCEPT.INAPP.PAYMENT');
	opaqueData.setDataValue('119eyJjb2RlIjoiNTBfMl8wNjAwMDUyN0JEODE4RjQxOUEyRjhGQkIxMkY0MzdGQjAxQUIwRTY2NjhFNEFCN0VENzE4NTUwMjlGRUU0M0JFMENERUIwQzM2M0ExOUEwMDAzNzlGRDNFMjBCODJEMDFCQjkyNEJDIiwidG9rZW4iOiI5NDkwMjMyMTAyOTQwOTk5NDA0NjAzIiwidiI6IjEuMSJ9');
	

	var paymentType = new ApiContracts.PaymentType();
	paymentType.setOpaqueData(opaqueData);

	var orderDetails = new ApiContracts.OrderType();
	orderDetails.setInvoiceNumber(customerObj.invoice);
	orderDetails.setDescription(customerObj.description);

	var tax = new ApiContracts.ExtendedAmountType();
	tax.setAmount(customerObj.tax.amount);
	tax.setName(customerObj.tax.name);
	tax.setDescription(customerObj.tax.description);

	var duty = new ApiContracts.ExtendedAmountType();
	duty.setAmount(customerObj.duty.amount);
	duty.setName(customerObj.duty.name);
	duty.setDescription(customerObj.duty.description);

	var shipping = new ApiContracts.ExtendedAmountType();
	shipping.setAmount(customerObj.shipping.amount);
	shipping.setName(customerObj.shipping.name);
	shipping.setDescription(customerObj.shipping.description);

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

	var lineItem = new ApiContracts.LineItemType();

	var lineItemList = [];
//	lineItemList.push(lineItem_id1);
//	lineItemList.push(lineItem_id2);


for(let item of customerObj.items){
	lineItem.setItemId(item.id);
	lineItem.setName(item.name);
	lineItem.setDescription(item.description);
	lineItem.setQuantity(item.quantity);
	lineItem.setUnitPrice(item.unitPrice);
	lineItemList.push(lineItem);
}


	var lineItems = new ApiContracts.ArrayOfLineItem();
	lineItems.setLineItem(lineItemList);

	var userField = new ApiContracts.UserField();

for(let user_Field of customerObj.userFields){
	userField.setName(user_Field.name);
	userField.setValue(user_Field.value);
	userFieldList.push(userField);
}


	var userFields = new ApiContracts.TransactionRequestType.UserFields();
	userFields.setUserField(userFieldList);

	var transactionSetting = new ApiContracts.SettingType();

	var transactionSettingList = [];

	for(let setting of customerObj.settings){
		transactionSetting.setSettingName(setting.name);
		transactionSetting.setSettingValue(setting.value);
		transactionSettingList.push(transactionSetting);
	}

	var transactionSettings = new ApiContracts.ArrayOfSetting();
	transactionSettings.setSetting(transactionSettingList);

	var transactionRequestType = new ApiContracts.TransactionRequestType();
	transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
	transactionRequestType.setPayment(paymentType);
	transactionRequestType.setAmount(utils.getRandomAmount());
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
	//Defaults to sandbox
	//ctrl.setEnvironment(SDKConstants.endpoint.production);

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

if (require.main === module) {
	createAnAcceptPaymentTransaction(function(){
		console.log('createAnAcceptPaymentTransaction call complete.');
	});
}

module.exports.createAnAcceptPaymentTransaction = createAnAcceptPaymentTransaction;