//import { getHostedProfilePage } from '../test-runner.js';

const AuthAPI=require('../test-runner');



function generateCustomerID(){
    const timeStamp=Date.now().toString(36);
    const randomChars=Math.random().toString(36).substring(2,5);
    return `${timeStamp}${randomChars}`;
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


function processRequestData(req){
        //data decryption required here
return {firstName,lastName,Address,state,zip,country,phoneNumber,city,cardNo,expiryDate,description,email,merchantID}=req.body;
}



let customerController={

 createCustomerProfile:(req,resp)=>{
let generatedObj=processRequestData(req);
let ID=generateCustomerID();
generatedObj['ID']=ID;
AuthAPI.createCustomerProfile(generatedObj,(response)=>{resp.status(200).send(response);  console.log('-------------processing has ended---------------')});
},



 createCustomerPaymentProfile:(req,resp)=>{
    let generatedObj=processRequestData(req);
    let {ID}=req.body;
    generatedObj['ID']=ID;
    //let {paymentID}=req.body;
    //generatedObj['paymentID']=paymentID;
AuthAPI.createCustomerPaymentProfile(generatedObj,()=>console.log('-------------processing has ended---------------'));
},

/*
  createCustomerProfileWithAccept:(req,resp)=>{
    let {dataValue,merchantID,description,email}=req.body;
    let obj={
        'dataValue':dataValue,
        'merchantID':merchantID,
        'description':description,
        'email':email
    }    

    AuthAPI.createCustomerProfileWithAccept(obj,(response)=>{resp.status(200).send(response); console.log('customer profile with accept created successfully')})

},*/


 createCustomerProfileFromTransaction:(req,resp)=>{
    //solve here first
    let {transaction_id}=req.body;

    let tnxObj=()=>{
        return  {cardDetails,orderDetails,taxDetails,dutyDetails,shippingDetails,BillTo,shipTo,items,invoiceAndDescription}=req.body;
    }

    console.log(">>>>>>>>>"+Object.keys(tnxObj()));

    AuthAPI.createCustomerProfileFromTransaction(transaction_id,tnxObj(),(resp)=>{resp.status(200).send(resp.responseText()); console.log('Profile from transaction created')})
},


 createCustomerShippingAddress:(req,resp)=>{
    let {shippingToObject}=req.body;
    AuthAPI.createCustomerShippingAddress(shippingToObject,(response)=>{resp.status(200).send(response); console.log('-------------processing has ended---------------')})
},



  deleteCustomerPaymentProfile:(req,resp)=>{
    let {ID,paymentProfileID}=req.body;
    AuthAPI.deleteCustomerPaymentProfile(ID,paymentProfileID,(response)=>{resp.state(200).send(response);console.log('-------------processing has ended---------------')})
},

 deleteCustomerProfile:(req,resp)=>{
    let {ID}=req.body;
    AuthAPI.deleteCustomerPaymentProfile(ID,(response)=>{resp.state(200).send(response) ; console.log('-------------processing has ended---------------')})
},


deleteCustomerShippingAddress:(req,resp)=>{
    let {ID,AddressID}=req.body;
    AuthAPI.deleteCustomerShippingAddress(ID,AddressID,(resp)=>{console.log('-------------processing has ended---------------')})
},



 deleteCustomerPaymentProfileList:(req,resp)=>{
    let {month}=req.body;
    AuthAPI.getcCustomerPaymentProfileList(momth,(response)=>{resp.status(200).send(response);  console.log(`Data from ${month} retrieved successfully`)})
},





 getCustomerPaymentProfile:(req,resp)=>{
    let {ID,paymentID}=req.body;
AuthAPI.getCustomerPaymentProfile(ID,paymentID,()=>console.log('-------------processing has ended---------------'));

},




 getCustomerProfileIDs:(resp)=>{
AuthAPI.getCustomerProfileIDs((response)=>{resp.status(200).send(response);  console.log('-------------processing has ended---------------')});

},



 getCustomerProfile:(req,resp)=>{
    let {ID}=req.body;
AuthAPI.getCustomerProfile(ID,()=>console.log('-------------processing has ended---------------'));

},


getCustomerShippingAddress:(req,resp)=>{
    let {ID,AddressID}=req.body;
AuthAPI.getCustomerShippingAddress(ID,AddressID,()=>console.log('-------------processing has ended---------------'));

},



 updateCustomerPaymentProfile:(req,resp)=>{
    let generatedObj=processRequestData(req);
    let {ID,paymentID}=req.body;
    generatedObj["ID"]=ID;
    generatedObj["paymentID"]=paymentID;
AuthAPI.updateCustomerPaymentProfile(generatedObj,(response)=>{resp.status(200).send(response.responseText()); console.log('-------------processing has ended---------------')});

},



 updateCustomerProfile:(req,resp)=>{
    let {ID,merchantID,email,description}=req.body;
    let obj={
        'ID':ID,
        'merchantID':merchantID,
        'email':email,
        'description':description    }

AuthAPI.updateCustomerProfile(obj,(response)=>{resp.status(200).send(response); console.log('-------------processing has ended---------------')});

},




 updateCustomerShippingAddress:(req,resp)=>{
    let generatedObj=processRequestData(req);
    let {ID,paymentID}=req.body;
    generatedObj["ID"]=ID;
    generatedObj["paymentID"]=paymentID;
AuthAPI.updateCustomerPaymentProfile(generatedObj,(response)=>{resp.status(200).send(response.responseText()); console.log('-------------processing has ended---------------')});

},


validateCustomerPaymentProfile:(req,resp)=>{
    let {ID,paymentID,cardCode}=req.body;
AuthAPI.ValidateCustomerPaymentProfile(ID,paymentID,cardCode,(response)=>{resp.status(200).send(response.responseText()); console.log('-------------processing has ended---------------')});

},

getHostedProfilePage:(req,resp)=>{
    let {ID}=req.body;
    AuthAPI.getHostedProfilePage(ID,(response)=>{resp.status(200).send(response); console.log('Token retrieved successfully::'+response.responseText())})
}

}



module.exports=customerController;



