let AuthAPI=require("../RecurringBilling/index");
const { createSubscription, getListOfSubscriptions, getSubscription, updateSubscription } = require("../test-runner");

let subscription={
createSubscription:(req,resp)=>{
    let customerObj=req.body;

  AuthAPI.createSubscription(customerObj,(response)=>{resp.status(200).send(response); console.log('processing done')})
},

cancelSubscription:(req,resp)=>{
let {ID}=req.body;
AuthAPI.cancelSubscription(ID,(response)=>{resp.status(200).send(response); console.log('processing done')})
},

createSubscriptionFromCustomerProfile:(req,resp)=>{
let {profile,paymentID,customerAddress}=req.body;

    AuthAPI.createSubscriptionFromCustomerProfile(profile,paymentID,customerAddress,(response)=>{resp.status(200).send(response); console.log('processing done')})
},


getListOfSubscriptions:(req,resp)=>{
    AuthAPI.getListOfSubscriptions((response)=>{resp.status(200).send(response); console.log('processing done')})
},

getSubscriptionStatus:(req,resp)=>{
    let {subscriptionID}=req.body;
    AuthAPI.getSubscriptionStatus(ID,(response)=>{resp.status(200).send(response); console.log('processing done')})
},

getSubscription:(req,resp)=>{
    let {subscriptionID}=req.body;
    AuthAPI.getSubscription(ID,(response)=>{resp.status(200).send(response); console.log('processing done')})
},

updateSubscription:(req,resp)=>{
    let {subscriptionID}=req.body;
    AuthAPI.updateSubscription(ID,(response)=>{resp.status(200).send(response); console.log('processing done')})
}

}

module.exports=subscription;