const { response } = require('express');
let acceptPaymentTxn=require('../AcceptSuite/create-an-accept-payment-transaction');
let acceptCustomerProfilePage=require('../AcceptSuite/get-accept-customer-profile-page');
let getAcceptPaymentPage=require("../AcceptSuite/get-an-accept-payment-page");


let Accept={
    acceptPaymentTxn:(req,resp)=>{
        let customerObj=req.body;

        acceptPaymentTxn.createAnAcceptPaymentTransaction(customerObj,(resonse)=>{
            resp.status(200).send(response);
            console.log('processing done');
        })
    },


    getAcceptCustomerProfilePage:(req,resp)=>{
        let {ID}=req.body;

        acceptCustomerProfilePage.getAcceptCustomerProfilePage(ID,(resonse)=>{
            resp.status(200).send(response);
            console.log('processing done');
        })
    },


    getAcceptPaymentPage:(req,resp)=>{
        let {settingObj}=req.body;

        getAcceptPaymentPage.getAnAcceptPaymentPage(settingObj,(resonse)=>{
            resp.status(200).send(response);
            console.log('processing done');
        })
    }
}


module.exports=Accept;