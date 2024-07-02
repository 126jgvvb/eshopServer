let AuthAPI=require('../FraudManagement/approve-or-decline-held-transaction');
let AuthAPI2=require('../FraudManagement/get-held-transaction-list');

let fraud={
approveORdeclineTrxn:(req,resp)=>{
    let {trxnID}=req.body;
    AuthAPI.updateHeldTransaction()
   // AuthAPI.updateHeldTransaction(trxnID,(response)=>{resp.status(200).send(response);  console.log('processing done')})
},

getHeldTransaction:(req,resp)=>{
    AuthAPI2.getUnsettledTransactionList()
}

}