let subscriptionController=require('../controllers/subScriptionController');

app.post('create-subscription',(req,resp)=>subscriptionController.createSubscription(req,resp));
app.post("cancel-subscription",(req,resp)=>subscriptionController.cancelSubscription(req,resp));
app.post("create-subscription-from-customer-profile",(req,resp)=>subscriptionController.createSubscriptionFromCustomerProfile(req,resp));

app.get("get-list-of-subscriptions",(req,resp)=>subscriptionController.getListOfSubscriptions(req,resp));
app.get("get-subscription-status",(req,resp)=>subscriptionController.getSubscriptionStatus(req,resp));
app.get("get-subscription",(req,resp)=>subscriptionController.getSubscription(req,resp));

app.get("update-subscription",(req,resp)=>subscriptionController.updateSubscription(req,resp));