'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');
var constants = require('../constants.js');

function chargeTokenizedCreditCard(obj,callback) {
	var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	var creditCard = new ApiContracts.CreditCardType();
	creditCard.setCardNumber(obj.cardNo);
	creditCard.setExpirationDate(obj.expiryDate);
	// Set the token specific info
	creditCard.setIsPaymentToken(true);
	creditCard.setCryptogram(obj.cryptoGram);		//'EjRWeJASNFZ4kBI0VniQEjRWeJA='

	var paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCard);

	var orderDetails = new ApiContracts.OrderType();
	orderDetails.setInvoiceNumber(obj.order.invoice);
	orderDetails.setDescription(obj.order.description);

	var tax = new ApiContracts.ExtendedAmountType();
	tax.setAmount(obj.tax.amount);
	tax.setName(obj.tax.name);
	tax.setDescription(obj.tax.description);

	var duty = new ApiContracts.ExtendedAmountType();
	duty.setAmount(obj.duty.amount);
	duty.setName(obj.duty.name);
	duty.setDescription(obj.duty.description);

	var shipping = new ApiContracts.ExtendedAmountType();
	shipping.setAmount(obj.shipping.amount);
	shipping.setName(obj.shipping.name);
	shipping.setDescription(obj.shipping.description);

	var billTo = new ApiContracts.CustomerAddressType();
	billTo.setFirstName(obj.billTo.firstName);
	billTo.setLastName(obj.billTo.lastName);
	billTo.setCompany(obj.billTo.company);
	billTo.setAddress(obj.billTo.address);
	billTo.setCity(obj.billTo.city);
	billTo.setState(obj.billTo.state);
	billTo.setZip(obj.billTo.zip);
	billTo.setCountry(obj.billTo.country);

	var shipTo = new ApiContracts.CustomerAddressType();
	shipTo.setFirstName(obj.shipTo.firstName);
	shipTo.setLastName(obj.shipTo.lastName);
	shipTo.setCompany(obj.shipTo.company);
	shipTo.setAddress(obj.shipTo.address);
	shipTo.setCity(obj.shipTo.city);
	shipTo.setState(obj.shipTo.state);
	shipTo.setZip(obj.shipTo.zip);
	shipTo.setCountry(obj.shipTo.country);

	var lineItem = new ApiContracts.LineItemType();
	var lineItemList = [];

	for(let item of obj.items){
		lineItem.setItemId(item.id);
		lineItem.setName(item.name);
		lineItem.setDescription(item.description);
		lineItem.setQuantity(item.quantity);
		lineItem.setUnitPrice(item.price);
		lineItemList.push(lineItem);
	}

	var lineItems = new ApiContracts.ArrayOfLineItem();
	lineItems.setLineItem(lineItemList);


	var userField = new ApiContracts.UserField();
	var userFieldList = [];
	
	for(let item of obj.userFields){
		userField.setName(item.name);
		userField.setValue(item.value);
		userFieldList.push(userField);
	}

	var userFields = new ApiContracts.TransactionRequestType.UserFields();
	userFields.setUserField(userFieldList);

	var transactionSetting = new ApiContracts.SettingType();
	/*transactionSetting1.setSettingName('duplicateWindow');
	transactionSetting1.setSettingValue('120');

	var transactionSetting2 = new ApiContracts.SettingType();
	transactionSetting2.setSettingName('recurringBilling');
	transactionSetting2.setSettingValue('false');
*/
	var transactionSettingList = [];
	transactionSettingList.push(transactionSetting1);
	transactionSettingList.push(transactionSetting2);

	for(let item of obj.settings){
		transactionSetting.setSettingName(item.name);
		transactionSetting.setSettingValue(item.value);
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
	chargeTokenizedCreditCard(function(){
		console.log('chargeTokenizedCreditCard call complete.');
	});
}

module.exports.chargeTokenizedCreditCard = chargeTokenizedCreditCard;
