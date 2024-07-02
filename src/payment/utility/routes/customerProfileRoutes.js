const profileController=require('../controllers/customerProfileController');

app.post('/create-customer-profile',(req,resp)=>profileController.createCustomerProfile(req,resp));
app.post('/create-customer-payment-profile',(req,resp)=>profileController.createCustomerPaymentProfile(req,resp));
app.post('/create-customer-profile-with-accept',(req,resp)=>profileController.createCustomerProfileWithAccept(req,resp));
app.post('/create-customer-profile-from-transaction',(req,resp)=>profileController.createCustomerProfileFromTransaction(req,resp));
app.post('/create-customer-shipping-address',(req,resp)=>profileController.createCustomerShippingAddress(req,resp));

app.delete('/delete-customer-payment-profile',(req,resp)=>profileController.deleteCustomerPaymentProfile(req,resp));
app.delete('/delete-customer-profile',(req,resp)=>profileController.deleteCustomerProfile(req,resp));
app.delete('/delete-customer-shipping-address',(req,resp)=>profileController.deleteCustomerShippingAddress(req,resp));
app.delete('/delete-customer-payment-profile-list',(req,resp)=>profileController.deleteCustomerPaymentProfileList(req,resp));

app.get('/get-customer-payment-profile',(req,resp)=>profileController.getCustomerPaymentProfile(req,resp));
app.get('/get-customer-profile-ids',(req,resp)=>profileController.getCustomerProfileIDs(resp));
app.get('/get-customer-profile',(req,resp)=>profileController.getCustomerProfile(req,resp));
app.delete('/get-customer-shipping-address',(req,resp)=>profileController.getCustomerShippingAddress(req,resp));
app.get('/get-hosted-profile-page',(req,resp)=>profileController.getHostedProfilePage(req,resp));

app.post('/update-customer-shipping-address',(req,resp)=>profileController.updateCustomerPaymentProfile(req,resp));
app.delete('/update-customer-shipping-address',(req,resp)=>profileController.updateCustomerPaymentProfile(req,resp));

app.post('/validate-customer-payment-profile',(req,resp)=>profileController.validateCustomerPaymentProfile(req,resp));