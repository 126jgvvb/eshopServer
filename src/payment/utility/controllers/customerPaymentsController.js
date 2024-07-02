const AuthAPI=require('../test-runner');

function processRequestData(req){
    //data decryption required here
return {firstName,lastName,Address,state,zip,country,phoneNumber,city,cardNo,expiryDate,description,email,merchantID}=req.body;
}


function generateCustomerObj(...params){
    return {
    'firstName':params[0],
    'lastName':params[1],
    'Address':params[2],
    'state':params[3],
    'zip':params[4],
    'country':params[5],
    'phoneNumber':params[6],
    'city':params[7],
    'cardNo':params[8],
    'expiryDate':params[9],
    'description':params[10],
    'email':params[12],
    'merchantID':params[13],
    'ID':params[14]
    }
}



let paymentController={

  captureFundsAuthorizedThroughAnotherChannel:(req,resp)=>{
    let txnObj=()=>{return  {cardDetails,invoice,description,authCode,amount}=req.body;}

AuthAPI.captureFundsAuthorizedThroughAnotherChannel(txnObj(),(response)=>{resp.status(200).send(response); console.log('-------------processing has ended---------------')});
},


  capturePreviouslyAuthorizedAmount:(req,resp)=>{
    let txnObj=()=>{return  {transactionID,invoice,description} =req.body;}

AuthAPI.capturePreviouslyAuthorizedAmount(txnObj(),(response)=>{
    resp.status(200).send(response);
     console.log('-------------processing has ended---------------');
    });
},



 chargeCreditCard:(req,resp)=>{
    let generatedObj=processRequestData(req);
    
    AuthAPI.chargeCreditCard(generatedObj,(response)=>{
        resp.status(200).send(response);
         console.log('-------------processing has ended---------------');
        });
    },


      chargeCustomerProfile:(req,resp)=>{
        let txnObj=()=>{return {ID,paymentID,invoice,description,items,person}=req.body;}
        
        AuthAPI.chargeCustomerProfile(txnObj(),(response)=>{
            resp.status(200).send(response);
             console.log('-------------processing has ended---------------');
            });
        },




          chargeTokenizedCreditCard:(req,resp)=>{
            let obj=req.body;

            AuthAPI.chargeTokenizedCreditCard(obj,(response)=>{
                resp.status(200).send(response);
                 console.log('-------------processing has ended---------------');
                })
        },


          createChasePayTransaction:(req,resp)=>{
            let obj=req.body;

            AuthAPI.createChasePayTransaction(obj,(response)=>{
                resp.status(200).send(response);
                 console.log('-------------processing has ended---------------');
                })
        },

        

          creditBankAccount:(req,resp)=>{
            let customerObj=req.body;


            AuthAPI.creditBankAccount(customerObj,(response)=>{
                resp.status(200).send(response);
                 console.log();
                })
        },




          refundTransaction:(req,resp)=>{
            let customerObj=req.body;


            AuthAPI.refundTransaction(customerObj,(response)=>{
                resp.status(200).send(response);
                 console.log();
                })
        },




        
          updatedSplitTenderGroup:(req,resp)=>{
            let split_tender_ID=req.body;


            AuthAPI.updatedSplitTenderGroup(split_tender_ID,(response)=>{
                resp.status(200).send(response);
                console.log('-------------processing has ended---------------');
                })
        },


          voidTransaction:(req,resp)=>{
            let transaction_id=req.body;

            AuthAPI.refundTransaction(transaction_id,(response)=>{
                resp.status(200).send(response);
                 console.log();
                })
        }
    }


    module.exports=paymentController;