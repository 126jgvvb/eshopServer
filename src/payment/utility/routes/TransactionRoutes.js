
let transactionController=require('../controllers/TransactioReportController');

app.post("/get-batch-statistics",(req,resp)=>transactionController.getBatchStatistics(req,resp));
app.post("/get-transaction-details",(req,resp)=>transactionController.getTransactionDetails(req,resp));
app.post("/get-merchant-details",(req,resp)=>transactionController.getMerchantDetails(req,resp));
app.post("/get-transaction-list",(req,resp)=>transactionController.getTransactionList(req,resp));
app.post("/get-unsettled-transaction-list",(req,resp)=>transactionController.getUnsettledTransactionList(req,resp));
app.post("/get-settled-batch-list",(req,resp)=>transactionController.getSettledBatchList(req,resp));
app.post("/get-customer-profile-transaction-list",(req,resp)=>transactionController.getCustomerProfileTransactionList(req,resp));