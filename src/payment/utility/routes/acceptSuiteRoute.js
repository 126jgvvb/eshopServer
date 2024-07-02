let AuthAPI=require('../controllers/acceptSuiteController');

app.post('create-accept-payment-transaction',(req,resp)=>AuthAPI.acceptPaymentTxn(req,resp));
app.post('get-accept-customer-profile-page',(req,resp)=>AuthAPI.getAcceptCustomerProfilePage(req,resp));
app.post('get-accept-payment-page',(req,resp)=>AuthAPI.getAcceptPaymentPage(req,resp));