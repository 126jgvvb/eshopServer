const paymentController=require('../controllers/customerPaymentsController');

app.post('/capture-funds-authorized-through-channel',(req,resp)=>paymentController.captureFundsAuthorizedThroughAnotherChannel(req,resp));
app.post('/capture-previously-authorized-amount',(req,resp)=>paymentController.capturePreviouslyAuthorizedAmount(req,resp));
app.post('/charge-credit-card',(req,resp)=>paymentController.chargeCreditCard(req,resp));
app.post('/charge-customer-profile',(req,resp)=>paymentController.chargeCustomerProfile(req,resp));
app.post('/charge-tokenized-credit-card',(req,resp)=>paymentController.chargeTokenizedCreditCard(req,resp));
app.post('/create-chase-pay-txn',(req,resp)=>paymentController.createChasePayTransaction(req,resp));
app.post('/credit-bank-account',(req,resp)=>paymentController.creditBankAccount(req,resp));
app.post('/refund-transaction',(req,resp)=>paymentController.refundTransaction(req,resp));
app.post('/update-split-tender-group',(req,resp)=>paymentController.updatedSplitTenderGroup(req,resp));
app.post('/void-transaction',(req,resp)=>paymentController.voidTransaction(req,resp));
