const { response } = require('express');
const { decryptVisaSrcData } = require('../test-runner');
let AuthAPI=require('../VisaCheckout/index');


let VisaObj={
        decryptVisaSrcData:(req,resp)=>{
            let configObj=req.body;

            AuthAPI.decryptVisaSrcData(configObj,(response)=>{
                resp.status(200).send(response);
                console.log('processing done');
            })
        },

        createVisaSrcTransaction:(req,resp)=>{
            let configObj=req.body;

            AuthAPI.createVisaSrcTransaction(configObj,(response)=>{
                resp.status(200).send(response);
                console.log('processing done');
            })
        }

}


module.exports=VisaObj;