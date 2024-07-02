const { response } = require("express");
const { getBatchStatistics, getSettledBatchList, getTransactionDetails, getTransactionList, getUnsettledTransactionList } = require("../test-runner");
let AuthAPI=require("../TransactionReporting/index");
const { getMerchantDetails } = require("../TransactionReporting/get-merchant-details");


let transactionObj={
    getBatchStatistics:(req,resp)=>{
        let {batchID}=req.body;

        AuthAPI.getBatchStatistics(batchID,(response)=>{
            resp.status(200).send(response);
            console.log("------------processing done-------------")});
    },

    getCustomerProfileTransactionList:(req,resp)=>{
        let {customerID}=req.body;

        AuthAPI.getTransactionListForCustomer(customerID,(response)=>{resp.status(200).send(response);
            console.log("------------processing done-------------")})
        },

        getMerchantDetails:(req,resp)=>{
            AuthAPI.getMerchantDetails((response)=>{
                resp.status(200).send(response);
                console.log("------------processing done-------------");
            })
        },

        getSettledBatchList:(req,resp)=>{
            AuthAPI.getSettledBatchList((response)=>{
                resp.status(200).send(response);
                console.log("------------processing done-------------");
            })
        },


        
        getTransactionDetails:(req,resp)=>{
            let {txnID}=req.body;

            AuthAPI.getSettledBatchList(txnID,(response)=>{
                resp.status(200).send(response);
                console.log("------------processing done-------------");
            })
        },


             
        getTransactionList:(req,resp)=>{
            let {txnID}=req.body;

            AuthAPI.getTransactionList(txnID,(response)=>{
                resp.status(200).send(response);
                console.log("------------processing done-------------");
            })
        },



        getUnsettledTransactionList:(req,resp)=>{
            AuthAPI.getUnsettledTransactionList((response)=>{
                resp.status(200).send(response);
                console.log("------------processing done-------------");
            })
        },

    }

    module.exports=transactionObj;
