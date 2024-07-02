/* eslint-disable prettier/prettier */
const http=require("http");
//const bodyparser=require("body-parser");

const express=require("express");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());

const paymentRoute=require('./eshopPayment/routes/paymentsRoutes');
const profileRoute=require('./eshopPayment/routes/customerProfileRoutes');
const TransactionRoutes=require('./eshopPayment/routes/TransactionRoutes');
const subScriptionRoute=require("./eshopPayment/routes/subScriptionRoutes");
const AcceptSuiteRoute=require('./eshopPayment/routes/acceptSuiteRoute');

const server=http.createServer(app);
server.listen(2000,()=>console.log("mealServer running at port:2000"));